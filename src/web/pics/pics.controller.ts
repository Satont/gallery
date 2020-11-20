import { Controller, Get, Query, Res, Render } from '@nestjs/common'
import { Response } from 'express'
import { PicsService } from './pics.service'
import { PicsValidator } from './pics.validator'

@Controller()
export class PicsController {
  constructor(private readonly service: PicsService) {}

  @Get('/pics')
  @Render('pages/pics.hbs')
  root() {
    return {}
  }

  @Get('/api/pics')
  async getPics(
  @Query() query: PicsValidator,
    @Res() res: Response
  ) {
    const { page, category } = query
    const pics = await this.service.getPics({ page: Number(page), category })

    res
      .type('application/json')
      .send({ pics })
  }
}
