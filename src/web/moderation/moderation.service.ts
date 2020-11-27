import { Injectable } from '@nestjs/common'
import { client as DiscordClient, sendUserNotification } from '../../discord'
import { File, Status } from '../../entities/File'
import { orm } from '../../libs/db'
import { MakeActionValidator } from './makeAction.validator'

@Injectable()
export class ModerationService {
  private readonly repository = orm.em.fork().getRepository(File)

  async getList() {
    const instances = await this.repository.find({
      status: Status.WAITING ,
    }, {
      orderBy: {
        createdAt: 'desc',
      },
    })
    const result = []

    for (const instance of instances) {
      const author = await DiscordClient.users.fetch(instance.author).catch(() => null)
      result.push({
        instance,
        author,
      })
    }

    return result
  }

  async makeAction(data: MakeActionValidator) {
    const instance = await this.repository.findOne({ id: data.id })
    this.repository.assign(instance, data)
    await this.repository.persistAndFlush(instance)
    sendUserNotification({ status: data.status, userId: instance.author, imageUrl: instance.fileUrl })
    return {}
  }
}
