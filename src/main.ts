// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import 'source-map-support/register'

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './web/app.module'
import { ValidationPipe } from '@nestjs/common'
import './discord'
import db, { orm } from './libs/db'
import { resolve } from 'path'
import session from 'express-session'
import passport from 'passport'
import ReqUserLocals from './web/auth/auth.middleware'
import './web/commons/handlebars'

async function bootstrap() {
  await db()
  if (!orm || !orm.isConnected()) {
    return setTimeout(() => bootstrap(), 1000)
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  })

  app.useStaticAssets(resolve(process.cwd(), 'public'))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.set('view engine', 'hbs')
  app.set('views', resolve(process.cwd(), 'views'))
  app.set('view options', {
    layout: 'layouts/index',
    templates: resolve(process.cwd(), 'views'),
  })

  app.use(session({
    secret: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    resave: false,
    saveUninitialized: false,
  }))

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(ReqUserLocals)

  await app.listen(3000, '0.0.0.0')
}
bootstrap()

process.on('unhandledRejection', r => console.error(r))
