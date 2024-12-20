import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// TypeORM 연동, 루트 Module에서 Import
export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sktkal!1',
    database: 'zk_streaming',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}