import { Controller, Get, Render } from '@nestjs/common'

@Controller()
export class IndexController {
  @Get()
  @Render('pages/index.hbs')
  root() {
    return {
      title: process.env.SITE_TITLE,
      description: process.env.SITE_DESCRIPTION,
      buttonText: 'Show list',
    }
  }
}
