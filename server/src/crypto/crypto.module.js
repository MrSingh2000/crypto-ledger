"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CryptoModule = void 0;
var common_1 = require("@nestjs/common");
var crypto_controller_1 = require("./crypto.controller");
var crypto_service_1 = require("./crypto.service");
var mongoose_1 = require("@nestjs/mongoose");
var crypto_schema_1 = require("../../../../../../src/schemas/crypto.schema");
var CryptoModule = /** @class */ (function () {
    function CryptoModule() {
    }
    CryptoModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: 'crypto', schema: crypto_schema_1.CryptoScehma }])],
            controllers: [crypto_controller_1.CryptoController],
            providers: [crypto_service_1.CryptoService]
        })
    ], CryptoModule);
    return CryptoModule;
}());
exports.CryptoModule = CryptoModule;
