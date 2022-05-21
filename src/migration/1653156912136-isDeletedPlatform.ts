import {MigrationInterface, QueryRunner} from "typeorm";

export class isDeletedPlatform1653156912136 implements MigrationInterface {
    name = 'isDeletedPlatform1653156912136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platforms" ADD "is_deleted" boolean NOT NULL DEFAULT 'f'`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "platforms" DROP COLUMN "is_deleted"`);
    }

}
