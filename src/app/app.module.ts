import { Module } from '@nestjs/common'
import { PicsController } from './pics/pics.controller'
import { PicsService } from './pics/pics.service'

@Module({
  imports: [],
  controllers: [PicsController],
  providers: [PicsService],
})
export class AppModule {}
