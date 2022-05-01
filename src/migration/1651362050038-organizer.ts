import {MigrationInterface, QueryRunner} from "typeorm";

export class organizer1651362050038 implements MigrationInterface {
    name = 'organizer1651362050038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "surname" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "balance" text NOT NULL, "photo" text NOT NULL, "reg_date" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "born_date" date NOT NULL, CONSTRAINT "PK_b59551a131f312443b992f90434" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "organizer"`);
    }

}
