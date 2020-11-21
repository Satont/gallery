import {
  Controller,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { DiscordAuthGuard } from './discord-auth.guard'

@Controller('auth')
export class AuthController {
  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async getUserFromDiscordLogin(@Res() res: Response) {
    res.redirect('/')
  }
}
