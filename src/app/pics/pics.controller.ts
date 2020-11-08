import { Controller, Get, Query, Res } from '@nestjs/common'
import { PicsService } from './pics.service'
import { FastifyReply } from 'fastify'
import { PicsValidator } from './pics.validator'

@Controller()
export class PicsController {
  constructor(private readonly service: PicsService) {}

  @Get('/api/pics')
  async getPics(
  @Query() query: PicsValidator,
    @Res() res: FastifyReply
  ) {
    const { page, category } = query
    const pics = await this.service.getPics({ page: Number(page), category })

    res
      .type('application/json')
      .send({ pics })
  }
}
