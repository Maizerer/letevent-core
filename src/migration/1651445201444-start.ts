import {MigrationInterface, QueryRunner} from "typeorm";

export class start1651445201444 implements MigrationInterface {
    name = 'start1651445201444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "inn"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "inn" text`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "inn"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "inn" integer`);
    }

}
