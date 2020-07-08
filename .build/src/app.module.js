"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_config_1 = require("nestjs-config");
const database_1 = require("./config/database");
const path = require("path");
const book_module_1 = require("./modules/book/book.module");
const author_module_1 = require("./modules/author/author.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nestjs_config_1.ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [nestjs_config_1.ConfigModule],
                useClass: database_1.TypeOrmConfigService,
            }),
            book_module_1.BookModule,
            author_module_1.AuthorModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map