import { Injectable } from '@nestjs/common'
import { client as DiscordClient, mainChannel } from '../../discord'

@Injectable()
export class UsersService {
  async findOne(id: string) {
    const user = await DiscordClient.users.fetch(id) ?? null
    const guild = mainChannel.guild
    return {
      avatarURL: user.avatarURL(),
      tag: user?.tag,
      owner: guild.ownerID === user?.id,
    }
  }
}
