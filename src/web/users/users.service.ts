import { Injectable } from '@nestjs/common'
import { client as DiscordClient } from '../../discord'

@Injectable()
export class UsersService {
  async findOne(id: string) {
    const user = await DiscordClient.users.fetch(id).catch(() => ({ tag: 'Unknown User' }))
    return user
  }
}
