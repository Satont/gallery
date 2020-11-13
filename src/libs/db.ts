import { MikroORM } from '@mikro-orm/core'

export let orm: MikroORM
export default async () => {
  orm = await MikroORM.init()
}
