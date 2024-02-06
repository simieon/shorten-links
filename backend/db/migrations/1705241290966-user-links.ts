import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLinks1705241290966 implements MigrationInterface {
    name = 'UserLinks1705241290966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`from\` varchar(255) NOT NULL, \`to\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`clicks\` int NOT NULL DEFAULT '0', \`ownerId\` int NULL, UNIQUE INDEX \`IDX_cbdec7ea1ee8ce5d884b824003\` (\`to\`), UNIQUE INDEX \`IDX_b118b8ec43546712aafecb95bd\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`link\` ADD CONSTRAINT \`FK_382945b9d8853d5f6eec2e9a840\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`link\` DROP FOREIGN KEY \`FK_382945b9d8853d5f6eec2e9a840\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b118b8ec43546712aafecb95bd\` ON \`link\``);
        await queryRunner.query(`DROP INDEX \`IDX_cbdec7ea1ee8ce5d884b824003\` ON \`link\``);
        await queryRunner.query(`DROP TABLE \`link\``);
    }

}
