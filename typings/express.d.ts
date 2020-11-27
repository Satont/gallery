import { User as DiscordJsUser } from 'discord.js'

/* declare namespace Express {
  export interface Request {
    user?: DiscordJsUser
  }
} */

/* declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends DiscordJsUser {}
} */

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends DiscordJsUser {}
  }
}
