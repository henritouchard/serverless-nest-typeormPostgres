"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const serverless = require("aws-serverless-express");
const aws_serverless_express_1 = require("aws-serverless-express");
const common_1 = require("@nestjs/common");
const binaryMimeTypes = [];
let cachedServer;
process.on('unhandledRejection', (reason) => {
    console.error(reason);
});
process.on('uncaughtException', (reason) => {
    console.error(reason);
});
function bootstrapServer() {
    const expressApp = require('express')();
    const adapter = new platform_express_1.ExpressAdapter(expressApp);
    return core_1.NestFactory.create(app_module_1.AppModule, adapter)
        .then(app => app.useGlobalPipes(new common_1.ValidationPipe()))
        .then(app => app.init())
        .then(app => app.enableCors())
        .then(() => serverless.createServer(expressApp));
}
exports.handler = (event, context) => __awaiter(this, void 0, void 0, function* () {
    cachedServer = yield bootstrapServer();
    return aws_serverless_express_1.proxy(cachedServer, event, context, 'PROMISE').promise;
});
//# sourceMappingURL=lambda.js.map