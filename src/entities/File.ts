import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'

export enum Categories {
  GENERAL = 'general',
  NSFW = 'nsfw',
  UNKNOWN = 'unknown',
}

export enum Status {
  WAITING = 'waiting',
  APPROVED = 'approved',
  DECLINED = 'declined'
}

@Entity({
  tableName: 'files',
})
export class File {
  @PrimaryKey()
  id: number

  @Property()
  fileUrl!: string

  @Property({ persist: false })
  get thumbnailUrl() {
    const array = this.fileUrl.split('.')
    const extension = array.pop()
    return `${array.join('.')}.th.${extension}`
  }

  @Property()
  name?: string = ''

  @Property()
  author: string

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()

  @Enum({ items: () => Categories, default: Categories.GENERAL })
  category? = Categories.GENERAL

  @Enum({ items: () => Status, default: Status.WAITING })
  status = Status.WAITING
}
