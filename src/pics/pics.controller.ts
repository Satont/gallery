import { Controller, Get, Render, Req, Res } from '@nestjs/common'
import { PicsService } from './pics.service'
import { FastifyReply, FastifyRequest } from 'fastify'

@Controller()
export class PicsController {
  constructor(private readonly service: PicsService) {}

  @Get('/pics')
  @Render('pages/pics.hbs')
  root() {
    return {}
  }

  @Get('/api/pics')
  getPics(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { page } = req.params as { page: number }
    const pics = this.service.getPics(page)

    res
      .type('application/json')
      .send({ pics })
  }
}
