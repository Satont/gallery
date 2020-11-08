import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'

export enum Categories {
  GENERAL = 'general',
  NFSW = 'nfsw',
  UNKNOWN = 'unknown',
}

@Entity({
  tableName: 'files',
})
export class File {
  @PrimaryKey()
  id: number

  @Property()
  fileUrl: string

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
}
