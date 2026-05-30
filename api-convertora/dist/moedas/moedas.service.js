"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoedasService = void 0;
const common_1 = require("@nestjs/common");
let MoedasService = class MoedasService {
    create(createMoedaDto) {
        return "This action adds a new moeda";
    }
    findAll() {
        return "Todas moedas: \n EUR \n USD \n BRL \n JPY ";
    }
    findOne(id) {
        return "This action returns a #${id} moeda";
    }
    update(id, updateMoedaDto) {
        return "This action updates a #${ id } moeda";
    }
    remove(id) {
        return "This action removes a #${id} moeda";
    }
};
exports.MoedasService = MoedasService;
exports.MoedasService = MoedasService = __decorate([
    (0, common_1.Injectable)()
], MoedasService);
//# sourceMappingURL=moedas.service.js.map