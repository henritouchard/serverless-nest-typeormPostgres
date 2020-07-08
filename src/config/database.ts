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
            console.log(process.env.DB_USER)
            options = {
                type: 'postgres',
                host: process.env.DB_HOST,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: parseInt(process.env.DB_PORT, 10),
                entities: [__dirname + '/../entity/**.entity{.ts,.js}'],
                synchronize: true,
            } as TypeOrmModuleOptions;
        }
        return options;
    }
}
