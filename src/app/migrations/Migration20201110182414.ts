import { Migration } from '@mikro-orm/migrations';

export class Migration20201110182414 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "files" drop constraint if exists "files_category_check";');
    this.addSql('alter table "files" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "files" add constraint "files_category_check" check ("category" in (\'general\', \'nsfw\', \'unknown\'));');
  }

}
