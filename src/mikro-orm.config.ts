// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { Options, EntityCaseNamingStrategy  } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Logger } from '@nestjs/common'

const Log = new Logger('db')

export default {
  logger: (msg: string) => Log.log(msg),
  debug: false,
  metadataProvider: TsMorphMetadataProvider,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  type: 'postgresql',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  baseDir: process.cwd(),
  entities: ['./dist/entities/**/*.js'],
  entitiesTs: ['./src/entities/**/*.ts'],
  cache: { pretty: true },
  namingStrategy: EntityCaseNamingStrategy,
  pool: {
    min: 2,
    max: 10,
  },
  driverOptions: {
    createTimeoutMillis: 8000,
    acquireTimeoutMillis: 8000,
    idleTimeoutMillis: 8000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false,
  },
  migrations: {
    tableName: 'migrations',
    path: './src/migrations',
    allOrNothing: false,
    transactional: true,
    dropTables: true,
    safe: true,
    emit: 'ts',
  },
} as Options
