import { Injectable } from '@nestjs/common'
import { File } from '../../entities/File'
import { orm } from '../../libs/db'
import { DiscordService } from '../discord/discord.service'

@Injectable()
export class PicsService {
  private readonly perPage = 50
  private readonly repository = orm.em.fork().getRepository(File)

  constructor(
    private readonly discordService: DiscordService
  ){}

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
    const instance = await this.repository.findOne({ id })
    return {
      ...instance,
      author: await this.discordService.getUser(instance.author),
      createdAt: new Date(instance.createdAt).toLocaleString('ru'),
    }
  }
}
