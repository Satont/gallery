import { Controller, Get, Query, Render, Res } from '@nestjs/common'
import { PicsService } from './pics.service'
import { FastifyReply } from 'fastify'
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
  getPics(@Query() query: PicsValidator, @Res() res: FastifyReply) {
    const { page } = query
    const pics = this.service.getPics(Number(page))

    res
      .type('application/json')
      .send({ pics })
  }
}
