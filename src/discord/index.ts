import { Logger } from '@nestjs/common'
import Axios from 'axios'
import { Client, Message, MessageEmbed, TextChannel } from 'discord.js'
import { Categories, File } from '../entities/File'
import { orm } from '../libs/db'

export const logger = new Logger('Discord')
const client = new Client({
  partials: ['REACTION', 'MESSAGE'],
})

let mainChannel: TextChannel = null
const avaliableEmojis = ['✅', '🔞', '❎'] as const

client.on('ready', () => {
  mainChannel = client.channels.cache.get(process.env.DISCORD_MAIN_CHANNEL_ID) as TextChannel
  logger.log(`Logged as ${client.user.tag}`)
})

client.on('message', async (msg) => {
  if (msg.member.user.bot) return
  if (msg.partial) await msg.fetch()
  if (msg.channel.type !== 'text') return

  const channel = await msg.channel.fetch() as TextChannel
  if (channel.parentID !== mainChannel.parentID) return

  await parseMainMessage(msg)
})

const parseMainMessage = async (msg: Message) => {
  const name = `pics-by-${msg.member.displayName.toLowerCase()}`
  if ((msg.channel as TextChannel).parentID !== mainChannel.parentID && (msg.channel as TextChannel).name !== name) return
  if (!msg.attachments.size) return await msg.delete()

  const attachments = msg.attachments
  const embeds: MessageEmbed[] = []
  const everyone = msg.guild.roles.cache.find(r => r.name === '@everyone')

  for (const attachment of [...attachments.values()]) {
    const embed = new MessageEmbed({
      description: attachment.name,
      author: {
        name: msg.member.user.tag,
        iconURL: msg.member.user.avatarURL(),
      },
      image: {
        url: attachment.proxyURL,
      },
    })
    embeds.push(embed)
  }

  const existedChannel = mainChannel.parent.children.find(c => c.name === name && c.type === 'text') as TextChannel

  const channel = existedChannel || await msg.guild.channels.create(name, {
    parent: mainChannel.parent,
    type: 'text',
    permissionOverwrites: [
      {
        type: 'member',
        id: msg.member.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'],
      },
      {
        type: 'role',
        id: everyone.id,
        deny: ['VIEW_CHANNEL'],
      },
    ],
  })

  for (const embed of embeds) {
    const message = await channel.send(embed)
    for (const emoji of avaliableEmojis) {
      await message.react(emoji)
    }
    logger.log(`New request to upload from ${msg.member.displayName}`)
  }

  await msg.delete()
}

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) await reaction.fetch()
  if (user.partial) await user.fetch()
  if (user.bot) return
  const emoji = reaction.emoji.toString()
  if (!avaliableEmojis.includes(emoji as any)) return

  await reaction.message.fetch()
  const guild = await reaction.message.guild.fetch()
  if (user.id !== guild.owner.id) return

  const channel = await reaction.message.channel.fetch() as TextChannel
  const messageId = reaction.message.id

  if (channel.parentID !== mainChannel.parentID) return
  const repository = orm.em.fork().getRepository(File)

  let category: Categories
  if (emoji === '✅') category = Categories.GENERAL
  else if (emoji === '🔞') category = Categories.NSFW
  else category = Categories.UNKNOWN

  if (emoji !== '❎') {
    const image = reaction.message.embeds[0].image
    const uploadedImage = await uploadImage(image.url)
    const file = repository.create({
      name: uploadedImage.name,
      author: reaction.message.embeds[0].author.name,
      fileUrl: uploadedImage.url,
      category,
    })

    await repository.persistAndFlush(file)
    logger.log(`Image from channel ${channel.name} uploaded.`)
  }

  const channelMessages = (await channel.messages.fetch()).filter(m => m.id !== messageId)
  if (!channelMessages.size) {
    logger.log(`Channel ${channel.name} deleted, because there is no more messages.`)
    await channel.delete()
  } else {
    await reaction.message.delete()
    logger.log(`Message deleted.`)
  }
})


client.login(process.env.DISCORD_TOKEN)

const uploadImage = async (source: string): Promise<{
  name: string,
  original_filename: string,
  url: string,
}> => {
  const {
    data: {
      image: {
        name,
        original_filename,
        url,
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
  }
}
