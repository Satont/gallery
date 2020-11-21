import { Controller, Get, Query, Res, Render, Param, NotFoundException } from '@nestjs/common'
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

  @Get('/pics/:id')
  @Render('pages/pic.hbs')
  async getPic(@Param('id') id: string) {
    const picture = await this.service.findOne(Number(id))
    if (!picture) throw new NotFoundException('Picture not found')
    else return picture
  }

  @Get('/api/pics')
  async getPics(
  @Query() query: PicsValidator,
    @Res() res: Response
  ) {
    const { page, category } = query
    const pics = await this.service.getByPage({ page: Number(page), category })

    res
      .type('application/json')
      .send({ pics })
  }
}
