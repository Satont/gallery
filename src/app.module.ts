import { Module } from '@nestjs/common'
import { PicsController } from './pics/pics.controller'
import { PicsService } from './pics/pics.service'
import { IndexController } from './app.controller'

@Module({
  imports: [],
  controllers: [PicsController, IndexController],
  providers: [PicsService],
})
export class AppModule {}
