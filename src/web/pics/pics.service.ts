import { Injectable } from '@nestjs/common'
import { File } from '../../entities/File'
import { orm } from '../../libs/db'

@Injectable()
export class PicsService {
  private readonly perPage = 50
  private readonly repository = orm.em.fork().getRepository(File)

  async getByPage({ page, category }: { page: number, category: string }) {
    const pics = await this.repository.find({
      category,
    }, {
      limit: this.perPage,
      offset: this.perPage * (page - 1),
      orderBy: {
        createdAt: 'DESC',
      },
    })

    return pics
  }

  async findOne(id: number) {
    return await this.repository.findOne({ id })
  }
}
