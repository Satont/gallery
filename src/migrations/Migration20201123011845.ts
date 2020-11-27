import { Migration } from '@mikro-orm/migrations';

export class Migration20201123011845 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "files" add column "status" text check ("status" in (\'waiting\', \'approved\', \'declined\')) not null default \'waiting\';');
  }

}
