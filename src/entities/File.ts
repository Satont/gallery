import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({
  tableName: 'files',
})
export class File {
  @PrimaryKey()
  id: number

  @Property()
  fileUrl: string

  @Property()
  author: string

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
