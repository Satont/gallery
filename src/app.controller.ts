import { Controller, Get, Render } from '@nestjs/common'

@Controller()
export class IndexController {
  @Get()
  @Render('pages/index.hbs')
  root() {
    return { title: 'Satont\'s Gallery', description: 'Collection of my pics', buttonText: 'Show list' }
  }
}
