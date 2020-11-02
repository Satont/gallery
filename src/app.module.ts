import { Module } from '@nestjs/common'
import { IndexController } from './index/index.controller'
import { PicsController } from './pics/pics.controller'
import { PicsService } from './pics/pics.service'

@Module({
  imports: [],
  controllers: [IndexController, PicsController],
  providers: [PicsService],
})
export class AppModule {}
