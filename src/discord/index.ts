import { Logger } from '@nestjs/common'
import Axios from 'axios'
import { Client, MessageEmbed, TextChannel } from 'discord.js'
import { Categories, File, Status } from '../entities/File'
import { orm } from '../libs/db'

export const logger = new Logger('Discord')
export const client = new Client({
  partials: ['REACTION', 'MESSAGE', 'GUILD_MEMBER', 'USER'],
})

export let mainChannel: TextChannel = null

client.on('ready', () => {
  mainChannel = client.channels.cache.get(process.env.DISCORD_MAIN_CHANNEL_ID) as TextChannel
  logger.log(`Logged as ${client.user.tag}`)
})

client.on('message', async (msg) => {
  if (msg.partial) await msg.fetch()
  if (msg.channel.type !== 'text') return
  if (msg.member.partial) await msg.member.fetch()
  if (msg.member.user.bot) return
  if (!msg.attachments.size) return

  const channel = await msg.channel.fetch() as TextChannel
  if (channel.parentID !== mainChannel.parentID) return

  const attachment = msg.attachments.first()
  const repository = orm.em.fork().getRepository(File)
  const uploadedImage = await uploadImage(attachment.url)
  const file = repository.create({
    name: attachment.name,
    author: msg.author.id,
    fileUrl: uploadedImage.url,
    category: Categories.UNKNOWN,
    status: Status.WAITING,
  })

  await repository.persistAndFlush(file)
  logger.log(`Image from ${msg.member.user.tag} | ${msg.author.id} uploaded.`)

  await msg.delete()
})

client.login(process.env.DISCORD_BOT_TOKEN)

export async function sendUserNotification({ userId, status, imageUrl }: { userId: string, status: Status, imageUrl: string }) {
  const user = await client.users.fetch(userId)

  const embed = new MessageEmbed({
    image: {
      url: imageUrl,
    },
  })

  if (status === Status.APPROVED) {
    await user.send(`Hey, ${user}, your image was accepted.`, {
      embed: new MessageEmbed({
        ...embed,
        color: 3967818,
      }),
    })
  } else {
    await user.send(`${user}, sorry, but your image was rejected. :(`, {
      embed: new MessageEmbed({
        ...embed,
        color: 13238321,
      }),
    })
  }
}

const uploadImage = async (source: string): Promise<{
  name: string,
  original_filename: string,
  url: string,
  thumnailUrl: string,
}> => {
  const {
    data: {
      image: {
        name,
        original_filename,
        url,
        thumb: {
          url: thumnailUrl,
        },
      },
    },
  } = await Axios.get(`https://freeimage.host/api/1/upload?source=${encodeURI(source)}`, {
    params: {
      key: process.env.FREEIMAGE_KEY,
    },
  })

  return {
    name,
    original_filename,
    url,
    thumnailUrl,
  }
}
