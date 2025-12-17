import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1765897066936 implements MigrationInterface {
    name = 'InitialMigration1765897066936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clinics" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "specialization" character varying NOT NULL, "clinicId" integer, CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "birthDate" character varying NOT NULL, "phone" character varying NOT NULL, "doctorId" integer, CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_01f41c4435b1e13060e05fdd557" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_c39435c71c0fff03449eb6b2332" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_c39435c71c0fff03449eb6b2332"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_01f41c4435b1e13060e05fdd557"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "clinics"`);
    }

}
