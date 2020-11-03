import { Migration } from '@mikro-orm/migrations';

export class Migration20201103191325 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "files" add column "name" varchar(255) null;');
  }

}
