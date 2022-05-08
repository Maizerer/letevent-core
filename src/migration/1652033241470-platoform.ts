import {MigrationInterface, QueryRunner} from "typeorm";

export class platoform1652033241470 implements MigrationInterface {
    name = 'platoform1652033241470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "platforms" ALTER COLUMN "reg_date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platforms" ALTER COLUMN "reg_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT '0'`);
    }

}
