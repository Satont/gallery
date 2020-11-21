import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/authenticated.guard'
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

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  async getMe(@Req() req: any) {
    return req.user
  }
}
