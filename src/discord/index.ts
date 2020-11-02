import { Logger } from '@nestjs/common'
import { Client, Message, MessageEmbed, TextChannel } from 'discord.js'
import { File } from '../entities/File'
import { orm } from '../libs/db'

export const logger = new Logger('Discord')
const client = new Client({
  partials: ['REACTION', 'MESSAGE'],
})

let mainChannel: TextChannel = null

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
        name: msg.member.displayName,
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
    await message.react('✅')
    await message.react('❎')
    logger.log(`New request to upload from ${msg.member.displayName}`)
  }

  await msg.delete()
}

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) await reaction.fetch()
  if (user.partial) await reaction.fetch()
  const emoji = reaction.emoji.toString()
  if (emoji !== '✅' && emoji !== '❎') return

  await reaction.message.fetch()
  const guild = await reaction.message.guild.fetch()
  if (user.id !== guild.owner.id) return

  const channel = await reaction.message.channel.fetch() as TextChannel
  const messageId = reaction.message.id

  if (channel.parentID !== mainChannel.parentID) return
  const repository = orm.em.fork().getRepository(File)

  if (emoji === '✅') {
    const image = reaction.message.embeds[0].image
    const file = repository.assign(new File(), {
      author: reaction.message.embeds[0].author.name,
      fileUrl: image.proxyURL,
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
