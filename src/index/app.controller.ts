import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/index.hbs')
  root() {
    const commands = this.appService.getCommands()
    return { commands, title: 'Satont\'s Gallery', description: 'Collection of my pics', buttonText: 'Show list' }
  }
}
