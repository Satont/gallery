import { Injectable } from '@nestjs/common'
import { client as DiscordClient } from '../../discord'

@Injectable()
export class DiscordService {
  async getUser(userId: string) {
    const user = await DiscordClient.users.fetch(userId).catch(() => ({ tag: 'Unknown User' }))
    return user
  }
}
