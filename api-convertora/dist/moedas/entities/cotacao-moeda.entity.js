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
exports.CotacaoMoeda = void 0;
const typeorm_1 = require("typeorm");
const moeda_entity_1 = require("./moeda.entity");
let CotacaoMoeda = class CotacaoMoeda {
    id;
    valor;
    dataModificacao;
    moeda;
};
exports.CotacaoMoeda = CotacaoMoeda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CotacaoMoeda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], CotacaoMoeda.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CotacaoMoeda.prototype, "dataModificacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => moeda_entity_1.Moeda, (m) => m.cotacoes),
    __metadata("design:type", moeda_entity_1.Moeda)
], CotacaoMoeda.prototype, "moeda", void 0);
exports.CotacaoMoeda = CotacaoMoeda = __decorate([
    (0, typeorm_1.Entity)()
], CotacaoMoeda);
//# sourceMappingURL=cotacao-moeda.entity.js.map