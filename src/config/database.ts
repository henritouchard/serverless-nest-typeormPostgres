import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const connectionManager: ConnectionManager = getConnectionManager();
        let options: any;

        if (connectionManager.has('default')) {
            options = connectionManager.get('default').options;
            await connectionManager.get('default').close();
        } else {
            console.log("get Options to connect database")
            options = {
                type: 'postgres',
                host: "127.0.0.1",//process.env.MYSQL_HOST,
                username: "postgres",//process.env.MYSQL_USER,
                password: null,//process.env.MYSQL_PASSWORD,
                database: "test",//process.env.MYSQL_DATABASE,
                port: 5432,//parseInt(process.env.MYSQL_PORT, 10),
                entities: [__dirname + '/../entity/**.entity{.ts,.js}'],
                synchronize: true,
            } as TypeOrmModuleOptions;
        }
        return options;
    }
}
