import { Module } from '@nestjs/common'
import { AppController } from './index/app.controller'
import { AppService } from './index/app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
