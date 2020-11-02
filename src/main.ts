// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { join } from 'path'
import { AppModule } from './app.module'
import * as hbs from 'hbs'
import { ValidationPipe } from '@nestjs/common'
import './discord'
import db, { orm } from './libs/db'

async function bootstrap() {
  await db()
  if (!orm || !orm.isConnected()) {
    return setTimeout(() => bootstrap(), 1000)
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  )

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  })
  app.setViewEngine({
    engine: {
      handlebars: require('hbs'),
    },
    templates: join(__dirname, '..', 'views'),
    layout: 'layouts/index.hbs',
  })
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
