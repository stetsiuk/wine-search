import { MigrationInterface, QueryRunner } from "typeorm";

export class createPartner1658136095350 implements MigrationInterface {
    name = 'createPartner1658136095350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "priority" integer NOT NULL, CONSTRAINT "UQ_9af6a8bd7cac55b61babc753853" UNIQUE ("name"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "partner" ("name", "priority")
            VALUES 
                ('wein.cc', 1),
                ('vinocentral.de', 10)
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "partner"`);
    }

}
