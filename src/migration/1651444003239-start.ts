import {MigrationInterface, QueryRunner} from "typeorm";

export class start1651444003239 implements MigrationInterface {
    name = 'start1651444003239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizators" ("name" text NOT NULL, "surname" text NOT NULL, "gender" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "phone" text, "balance" numeric, "photo" text, "fingerprint" text array, "id" SERIAL NOT NULL, "born_date" date NOT NULL, "reg_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_403db5241f14c590d9d208343da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "organizators_pkey" ON "organizators" ("id") `);
        await queryRunner.query(`CREATE TABLE "reservs" ("id" SERIAL NOT NULL, "org_id" integer NOT NULL, "platform_id" integer NOT NULL, "owner_id" integer NOT NULL, "reserve_time" text NOT NULL, "hours_count" integer NOT NULL, "total_price" numeric NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE, "reserve_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_439d7f14276ebfd03caa37bf06f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "fki_owners" ON "reservs" ("platform_id") `);
        await queryRunner.query(`CREATE INDEX "fki_reservs_owners" ON "reservs" ("owner_id") `);
        await queryRunner.query(`CREATE INDEX "fki_org_id" ON "reservs" ("org_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "reservs_pkey" ON "reservs" ("id") `);
        await queryRunner.query(`CREATE TABLE "owners" ("id" SERIAL NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "patronymic" text NOT NULL, "gender" text NOT NULL, "password" text NOT NULL, "reg_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" text NOT NULL, "phone" text NOT NULL, "organization" text, "passport" text, "inn" integer, "balance" numeric NOT NULL DEFAULT '0', "photo" text, "born_date" date NOT NULL, CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "owners_pkey" ON "owners" ("id") `);
        await queryRunner.query(`CREATE TABLE "platforms" ("name" text NOT NULL, "graphic" text NOT NULL, "address" text NOT NULL, "conditions" text NOT NULL, "phone" text NOT NULL, "reg_date" TIMESTAMP WITH TIME ZONE NOT NULL, "rules" text NOT NULL, "area" numeric NOT NULL, "main_img" text, "photos" text array, "capacity" numeric NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "id" SERIAL NOT NULL, "owner_id" integer, CONSTRAINT "PK_3b879853678f7368d46e52b81c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "platforms_pkey" ON "platforms" ("id") `);
        await queryRunner.query(`CREATE TABLE "platform_facilities" ("id" SERIAL NOT NULL, "platform_id" integer NOT NULL, "facility_id" integer NOT NULL, "price" numeric DEFAULT 0, CONSTRAINT "PK_d12f3a66271da97d08f9f5ee215" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "fki_d" ON "platform_facilities" ("platform_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "platform_facilities_pkey" ON "platform_facilities" ("id") `);
        await queryRunner.query(`CREATE INDEX "fki_1" ON "platform_facilities" ("facility_id") `);
        await queryRunner.query(`CREATE TABLE "facilities" ("id" SERIAL NOT NULL, "src" text NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_2e6c685b2e1195e6d6394a22bc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "facilities_pkey" ON "facilities" ("id") `);
        await queryRunner.query(`ALTER TABLE "reservs" ADD CONSTRAINT "FK_7111e2eff2318e4b6410eb63dc4" FOREIGN KEY ("org_id") REFERENCES "organizators"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "reservs" ADD CONSTRAINT "FK_39c255ac2277d7cb5031ee3a7a7" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "reservs" ADD CONSTRAINT "FK_c44e53f025982e977f920afbf0d" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "platforms" ADD CONSTRAINT "FK_8f936c585a663fbfa35f064dfba" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ADD CONSTRAINT "FK_bf59d67b9ea9ed89a7a4e986844" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" ADD CONSTRAINT "FK_5fe8afb733c29e836dc01e5a8f9" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform_facilities" DROP CONSTRAINT "FK_5fe8afb733c29e836dc01e5a8f9"`);
        await queryRunner.query(`ALTER TABLE "platform_facilities" DROP CONSTRAINT "FK_bf59d67b9ea9ed89a7a4e986844"`);
        await queryRunner.query(`ALTER TABLE "platforms" DROP CONSTRAINT "FK_8f936c585a663fbfa35f064dfba"`);
        await queryRunner.query(`ALTER TABLE "reservs" DROP CONSTRAINT "FK_c44e53f025982e977f920afbf0d"`);
        await queryRunner.query(`ALTER TABLE "reservs" DROP CONSTRAINT "FK_39c255ac2277d7cb5031ee3a7a7"`);
        await queryRunner.query(`ALTER TABLE "reservs" DROP CONSTRAINT "FK_7111e2eff2318e4b6410eb63dc4"`);
        await queryRunner.query(`DROP INDEX "public"."facilities_pkey"`);
        await queryRunner.query(`DROP TABLE "facilities"`);
        await queryRunner.query(`DROP INDEX "public"."fki_1"`);
        await queryRunner.query(`DROP INDEX "public"."platform_facilities_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."fki_d"`);
        await queryRunner.query(`DROP TABLE "platform_facilities"`);
        await queryRunner.query(`DROP INDEX "public"."platforms_pkey"`);
        await queryRunner.query(`DROP TABLE "platforms"`);
        await queryRunner.query(`DROP INDEX "public"."owners_pkey"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP INDEX "public"."reservs_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."fki_org_id"`);
        await queryRunner.query(`DROP INDEX "public"."fki_reservs_owners"`);
        await queryRunner.query(`DROP INDEX "public"."fki_owners"`);
        await queryRunner.query(`DROP TABLE "reservs"`);
        await queryRunner.query(`DROP INDEX "public"."organizators_pkey"`);
        await queryRunner.query(`DROP TABLE "organizators"`);
    }

}
