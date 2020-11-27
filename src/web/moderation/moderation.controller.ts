import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common'
import { Categories } from '../../entities/File'
import { AuthenticatedGuard } from '../auth/authenticated.guard'
import { OwnerGuard } from '../users/owner.guard'
import { MakeActionValidator } from './makeAction.validator'
import { ModerationService } from './moderation.service'

@Controller()
export class ModerationController {
  constructor(private readonly service: ModerationService) {}

  @Get('/moderation')
  @UseGuards(AuthenticatedGuard, OwnerGuard)
  @Render('pages/moderation')
  async root() {
    const list = await this.service.getList()
    const categories = Object.values(Categories)
    return { list, categories }
  }

  @Get('/api/moderation')
  @UseGuards(AuthenticatedGuard, OwnerGuard)
  async getModeration() {
    return await this.service.getList()
  }

  @Post('/api/moderation')
  @UseGuards(AuthenticatedGuard, OwnerGuard)
  async makeAction(@Body() body: MakeActionValidator) {
    return await this.service.makeAction(body)
  }
}
