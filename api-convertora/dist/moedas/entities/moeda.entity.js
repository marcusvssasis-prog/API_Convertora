"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moeda = void 0;
const typeorm_1 = require("typeorm");
const cotacao_moeda_entity_1 = require("./cotacao-moeda.entity");
let Moeda = class Moeda {
    id;
    nome;
    cotacoes;
};
exports.Moeda = Moeda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Moeda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Moeda.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cotacao_moeda_entity_1.CotacaoMoeda, (c) => c.moeda),
    __metadata("design:type", Array)
], Moeda.prototype, "cotacoes", void 0);
exports.Moeda = Moeda = __decorate([
    (0, typeorm_1.Entity)()
], Moeda);
//# sourceMappingURL=moeda.entity.js.map