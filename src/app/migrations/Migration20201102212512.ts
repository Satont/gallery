import { Migration } from '@mikro-orm/migrations';

export class Migration20201102212512 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "files" ("id" serial primary key, "fileUrl" varchar(255) not null, "author" varchar(255) not null, "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null);');
  }

}
