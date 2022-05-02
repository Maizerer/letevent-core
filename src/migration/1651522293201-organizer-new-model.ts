import {MigrationInterface, QueryRunner} from "typeorm";

export class organizerNewModel1651522293201 implements MigrationInterface {
    name = 'organizerNewModel1651522293201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizators" DROP COLUMN "fingerprint"`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "organizators" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."organizators_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "organizators" ADD "gender" "public"."organizators_gender_enum" NOT NULL DEFAULT 'male'`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "balance" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "balance" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "reg_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "reg_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "public"."owners_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "gender" "public"."owners_gender_enum" NOT NULL DEFAULT 'male'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."owners_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "gender" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "reg_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "reg_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "balance" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizators" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."organizators_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "organizators" ADD "gender" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "organizators" ADD "fingerprint" text array`);
    }

}
