import { Controller, Get, Render, Res } from '@nestjs/common'
import { PicsService } from './pics.service'
import { FastifyReply } from 'fastify'

@Controller()
export class PicsController {
  constructor(private readonly service: PicsService) {}

  @Get('/pics')
  @Render('pages/pics.hbs')
  root() {
    return {}
  }

  @Get('/api/pics')
  getPics(@Res() res: FastifyReply) {
    const pics = this.service.getPics()
    res.type('application/json').send({ pics })
  }
}
