import { User } from 'discord.js'

declare module 'express' {
  interface Request {
    user: User
  }
}
