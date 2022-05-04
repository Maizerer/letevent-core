import {MigrationInterface, QueryRunner} from "typeorm";

export class rolesEntity1651649379362 implements MigrationInterface {
    name = 'rolesEntity1651649379362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" text NOT NULL, "value" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
