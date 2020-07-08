"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionManager = typeorm_1.getConnectionManager();
            let options;
            if (connectionManager.has('default')) {
                options = connectionManager.get('default').options;
                yield connectionManager.get('default').close();
            }
            else {
                console.log("get Options to connect database");
                console.log(process.env.DB_USER);
                options = {
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    port: parseInt(process.env.DB_PORT, 10),
                    entities: [__dirname + '/../entity/**.entity{.ts,.js}'],
                    synchronize: true,
                };
            }
            return options;
        });
    }
};
TypeOrmConfigService = __decorate([
    common_1.Injectable()
], TypeOrmConfigService);
exports.TypeOrmConfigService = TypeOrmConfigService;
//# sourceMappingURL=database.js.map