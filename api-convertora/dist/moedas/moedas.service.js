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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoedasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moeda_entity_1 = require("./entities/moeda.entity");
const cotacao_moeda_entity_1 = require("./entities/cotacao-moeda.entity");
let MoedasService = class MoedasService {
    moedaRepo;
    cotacaoRepo;
    constructor(moedaRepo, cotacaoRepo) {
        this.moedaRepo = moedaRepo;
        this.cotacaoRepo = cotacaoRepo;
    }
    async create(dto) {
        const moeda = this.moedaRepo.create({ nome: dto.nome });
        return await this.moedaRepo.save(moeda);
    }
    async addCotacao(id, valor) {
        const moeda = await this.moedaRepo.findOneBy({ id });
        if (!moeda) {
            throw new common_1.NotFoundException("Moeda com ID ${id} não encontrada");
        }
        const cotacao = this.cotacaoRepo.create({ valor, moeda });
        return await this.cotacaoRepo.save(cotacao);
    }
    async updateCotacao(id, dto) {
        const cotacaoExiste = await this.cotacaoRepo.findOneBy({ id });
        if (!cotacaoExiste) {
            throw new common_1.NotFoundException(`Cotação com ID ${id} não encontrada`);
        }
        await this.cotacaoRepo.update(id, { valor: dto.valor });
        return await this.cotacaoRepo.findOneOrFail({
            where: { id },
        });
    }
    async findAll() {
        return await this.moedaRepo.find({ relations: { cotacoes: true } });
    }
    async findOne(id) {
        const moeda = await this.moedaRepo.findOne({
            where: { id },
            relations: { cotacoes: true },
        });
        if (!moeda) {
            throw new common_1.NotFoundException("Moeda com ID ${ID)  não encontrada");
        }
        return moeda;
    }
    async update(id, dto) {
        await this.moedaRepo.update(id, { nome: dto.nome });
        return await this.findOne(id);
    }
    async remove(id) {
        await this.moedaRepo.delete(id);
    }
    async converter(from, to, amount) {
        const moedaFrom = await this.moedaRepo.findOne({
            where: { nome: from },
            relations: { cotacoes: true }
        });
        const moedaTo = await this.moedaRepo.findOne({
            where: { nome: to },
            relations: { cotacoes: true }
        });
        if (!moedaFrom || !moedaTo)
            throw new common_1.NotFoundException('Moeda não encontrada');
        if (!moedaFrom.cotacoes.length || !moedaTo.cotacoes.length)
            throw new common_1.BadRequestException('Moeda sem cotação registrada');
        const taxaFrom = moedaFrom.cotacoes
            .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
        const taxaTo = moedaTo.cotacoes
            .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
        const resultado = amount * (taxaTo / taxaFrom);
        return { from, to, amount, resultado, taxaFrom, taxaTo };
    }
};
exports.MoedasService = MoedasService;
exports.MoedasService = MoedasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(moeda_entity_1.Moeda)),
    __param(1, (0, typeorm_1.InjectRepository)(cotacao_moeda_entity_1.CotacaoMoeda)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], MoedasService);
//# sourceMappingURL=moedas.service.js.map