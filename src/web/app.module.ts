import { Module } from '@nestjs/common'
import { PicsController } from './pics/pics.controller'
import { PicsService } from './pics/pics.service'
import { IndexController } from './app.controller'
import { DiscordController } from './discord/discord.controller'
import { DiscordService } from './discord/discord.service'
import { AuthModule } from './auth/auth.module'
import { UsersService } from './users/users.service'
import { UsersModule } from './users/users.module'

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [PicsController, IndexController, DiscordController],
  providers: [PicsService, DiscordService, UsersService],
})
export class AppModule {}
