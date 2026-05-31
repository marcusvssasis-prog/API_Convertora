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
exports.ConversaoHistorico = void 0;
const typeorm_1 = require("typeorm");
let ConversaoHistorico = class ConversaoHistorico {
    id;
    moedaFrom;
    moedaTo;
    amount;
    resultado;
    taxaFrom;
    taxaTo;
    dataCriacao;
};
exports.ConversaoHistorico = ConversaoHistorico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConversaoHistorico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ConversaoHistorico.prototype, "moedaFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ConversaoHistorico.prototype, "moedaTo", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 6 }),
    __metadata("design:type", Number)
], ConversaoHistorico.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 6 }),
    __metadata("design:type", Number)
], ConversaoHistorico.prototype, "resultado", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 6 }),
    __metadata("design:type", Number)
], ConversaoHistorico.prototype, "taxaFrom", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 18, scale: 6 }),
    __metadata("design:type", Number)
], ConversaoHistorico.prototype, "taxaTo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConversaoHistorico.prototype, "dataCriacao", void 0);
exports.ConversaoHistorico = ConversaoHistorico = __decorate([
    (0, typeorm_1.Entity)()
], ConversaoHistorico);
//# sourceMappingURL=conversao-historico.entity.js.map