import { Logger } from '@nestjs/common'
import { Client, Message, MessageEmbed, TextChannel } from 'discord.js'

const logger = new Logger('Discord')
const client = new Client({
  partials: ['REACTION', 'MESSAGE'],
})

let mainChannel: TextChannel = null

client.on('ready', () => {
  mainChannel = client.channels.cache.get(process.env.DISCORD_MAIN_CHANNEL_ID) as TextChannel
  logger.log(`Logged as ${client.user.tag}`)
})

client.on('message', async (msg) => {
  if (msg.partial) await msg.fetch()
  if (msg.channel.type !== 'text') return

  const channel = await msg.channel.fetch() as TextChannel
  if (channel.parentID !== mainChannel.parentID) return

  if (channel.id === mainChannel.id) await parseMainMessage(msg)
})

const parseMainMessage = async (msg: Message) => {
  if (!msg.attachments.size) return await msg.delete()

  const attachments = msg.attachments
  const embeds: MessageEmbed[] = []
  const everyone = msg.guild.roles.cache.find(r => r.name === '@everyone')

  for (const [, attachment] of attachments) {
    const embed = new MessageEmbed({
      description: attachment.name,
      author: {
        name: msg.member.displayName,
        iconURL: msg.member.user.avatarURL(),
      },
      image: {
        url: attachment.url,
      },
    })
    embeds.push(embed)
  }

  const name = `pics-by-${msg.member.displayName.toLowerCase()}`
  const existedChannel = mainChannel.parent.children.find(c => c.name === name && c.type === 'text') as TextChannel

  const channel = existedChannel || await msg.guild.channels.create(name, {
    parent: mainChannel.parent,
    type: 'text',
    permissionOverwrites: [
      {
        type: 'member',
        id: msg.member.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
      },
      {
        type: 'role',
        id: everyone.id,
        deny: ['VIEW_CHANNEL'],
      },
    ],
  })

  for (const embed of embeds) {
    const msg = await channel.send(embed)
    await msg.react('✅')
    await msg.react('❎')
  }

  await msg.delete()
}

client.login(process.env.DISCORD_TOKEN)
