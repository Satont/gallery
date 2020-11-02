import { Injectable } from '@nestjs/common'
import { File } from '../entities/File'
import { orm } from '../libs/db'

@Injectable()
export class PicsService {
  private readonly perPage = 50
  private readonly repository = orm.em.fork().getRepository(File)

  async getPics(page: number): Promise<string[]> {
    const items = await this.repository.find({}, {
      limit: this.perPage,
      offset: this.perPage * (page - 1),
      orderBy: {
        createdAt: 'DESC',
      },
    })

    const pics = items.map(i => i.fileUrl)
    return pics
  }
}
