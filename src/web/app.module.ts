import { Module } from '@nestjs/common'
import { PicsController } from './pics/pics.controller'
import { PicsService } from './pics/pics.service'
import { IndexController } from './app.controller'
import { DiscordController } from './discord/discord.controller'
import { DiscordService } from './discord/discord.service';

@Module({
  imports: [],
  controllers: [PicsController, IndexController, DiscordController],
  providers: [PicsService, DiscordService],
})
export class AppModule {}
