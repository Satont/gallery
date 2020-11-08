import { Migration } from '@mikro-orm/migrations';

export class Migration20201108024041 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "files" add column "category" text check ("category" in (\'general\', \'nfsw\', \'unknown\')) null default \'general\';');
  }

}
