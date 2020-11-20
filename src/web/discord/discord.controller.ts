import { Controller, Get, Inject, Param } from '@nestjs/common'
import { DiscordService } from './discord.service'

@Controller('/api/discord')
export class DiscordController {
  constructor(
    private readonly service: DiscordService
  ) {}
  @Get('users/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.service.getUser(userId)
  }
}
