import { MigrationInterface, QueryRunner } from "typeorm";

export class test1657985108517 implements MigrationInterface {
    name = 'test1657985108517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "priority" integer NOT NULL, CONSTRAINT "UQ_9af6a8bd7cac55b61babc753853" UNIQUE ("name"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0921e872ef29dd1db90b6aeda4" ON "producer" ("name") `);
        await queryRunner.query(`CREATE TABLE "sort" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_4791f87c0c0cc8c1eb123301935" UNIQUE ("name"), CONSTRAINT "PK_2b75343e5f1a462cacb8b7331ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wine" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "producer" character varying NOT NULL, "vintage" integer, "price" double precision NOT NULL, "alcohol" double precision, "volume" double precision, "quantity" integer NOT NULL DEFAULT '1', "partnerId" integer, "affiliateLink" character varying, "imageUrl" character varying, "merchantId" character varying, "merchantUrl" character varying, "land" character varying, "region" character varying, "ean" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_37fafeb69e78f7c842d28cf5005" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visit" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "wineIdId" integer, "requestIdId" integer, CONSTRAINT "REL_da4c509b374b9d7625aaaa96be" UNIQUE ("wineIdId"), CONSTRAINT "REL_73af99ebccd9c591881b9098dc" UNIQUE ("requestIdId"), CONSTRAINT "PK_c9919ef5a07627657c535d8eb88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wine" ADD CONSTRAINT "FK_2a999030209481975b50038c6e5" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_da4c509b374b9d7625aaaa96be1" FOREIGN KEY ("wineIdId") REFERENCES "wine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_73af99ebccd9c591881b9098dc4" FOREIGN KEY ("requestIdId") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_73af99ebccd9c591881b9098dc4"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_da4c509b374b9d7625aaaa96be1"`);
        await queryRunner.query(`ALTER TABLE "wine" DROP CONSTRAINT "FK_2a999030209481975b50038c6e5"`);
        await queryRunner.query(`DROP TABLE "visit"`);
        await queryRunner.query(`DROP TABLE "wine"`);
        await queryRunner.query(`DROP TABLE "sort"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0921e872ef29dd1db90b6aeda4"`);
        await queryRunner.query(`DROP TABLE "producer"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
