// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import 'source-map-support/register'

import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import './discord'
import db, { orm } from './libs/db'
import { resolve } from 'path'

async function bootstrap() {
  await db()
  if (!orm || !orm.isConnected()) {
    return setTimeout(() => bootstrap(), 1000)
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  )

  app.useStaticAssets({
    root: resolve(process.cwd(), 'public'),
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3000, '0.0.0.0')
}
bootstrap()

process.on('unhandledRejection', r => console.error(r))
