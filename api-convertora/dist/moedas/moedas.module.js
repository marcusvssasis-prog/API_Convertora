"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoedasModule = void 0;
const common_1 = require("@nestjs/common");
const moedas_service_1 = require("./moedas.service");
const moedas_controller_1 = require("./moedas.controller");
let MoedasModule = class MoedasModule {
};
exports.MoedasModule = MoedasModule;
exports.MoedasModule = MoedasModule = __decorate([
    (0, common_1.Module)({
        controllers: [moedas_controller_1.MoedasController],
        providers: [moedas_service_1.MoedasService],
    })
], MoedasModule);
//# sourceMappingURL=moedas.module.js.map