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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoedasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moeda_entity_1 = require("./entities/moeda.entity");
const cotacao_moeda_entity_1 = require("./entities/cotacao-moeda.entity");
const conversao_historico_entity_1 = require("./entities/conversao-historico.entity");
let MoedasService = class MoedasService {
    moedaRepo;
    cotacaoRepo;
    historicoRepo;
    constructor(moedaRepo, cotacaoRepo, historicoRepo) {
        this.moedaRepo = moedaRepo;
        this.cotacaoRepo = cotacaoRepo;
        this.historicoRepo = historicoRepo;
    }
    async create(dto) {
        const moeda = this.moedaRepo.create({ nome: dto.nome });
        return await this.moedaRepo.save(moeda);
    }
    async addCotacao(id, valor) {
        const moeda = await this.moedaRepo.findOneBy({ id });
        if (!moeda) {
            throw new common_1.NotFoundException(`Moeda com ID ${id} não encontrada`);
        }
        const cotacao = this.cotacaoRepo.create({ valor, moeda });
        return await this.cotacaoRepo.save(cotacao);
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
            throw new common_1.NotFoundException(`Moeda com ID ${id} não encontrada`);
        }
        return moeda;
    }
    async update(id, dto) {
        const resultado = await this.moedaRepo.update(id, { nome: dto.nome });
        if (resultado.affected === 0) {
            throw new common_1.NotFoundException(`Moeda com ID ${id} não encontrada`);
        }
        return await this.findOne(id);
    }
    async remove(id) {
        const resultado = await this.moedaRepo.delete(id);
        if (resultado.affected === 0) {
            throw new common_1.NotFoundException(`Moeda com ID ${id} não encontrada`);
        }
    }
    async converter(from, to, amount) {
        if (!from || !to || amount == null) {
            throw new common_1.BadRequestException('Parâmetros inválidos para conversão');
        }
        const moedaFrom = await this.moedaRepo.findOne({
            where: { nome: from },
            relations: { cotacoes: true },
        });
        const moedaTo = await this.moedaRepo.findOne({
            where: { nome: to },
            relations: { cotacoes: true },
        });
        if (!moedaFrom) {
            throw new common_1.NotFoundException(`Moeda de origem ${from} não encontrada`);
        }
        if (!moedaTo) {
            throw new common_1.NotFoundException(`Moeda de destino ${to} não encontrada`);
        }
        if (!moedaFrom.cotacoes.length || !moedaTo.cotacoes.length) {
            throw new common_1.BadRequestException('Ambas as moedas precisam ter cotações registradas');
        }
        const taxaFrom = moedaFrom.cotacoes
            .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
        const taxaTo = moedaTo.cotacoes
            .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
        const resultado = Number((amount * (taxaTo / taxaFrom)).toFixed(6));
        const historico = this.historicoRepo.create({
            moedaFrom: from,
            moedaTo: to,
            amount,
            resultado,
            taxaFrom,
            taxaTo,
        });
        await this.historicoRepo.save(historico);
        return { from, to, amount, resultado, taxaFrom, taxaTo };
    }
    async findAllConversoes() {
        return await this.historicoRepo.find({
            order: { dataCriacao: 'DESC' },
        });
    }
    async updateConversao(id, payload) {
        const conversao = await this.historicoRepo.findOneBy({ id });
        if (!conversao) {
            throw new common_1.NotFoundException(`Conversão com ID ${id} não encontrada`);
        }
        const atualizado = Object.assign(conversao, payload);
        return await this.historicoRepo.save(atualizado);
    }
};
exports.MoedasService = MoedasService;
exports.MoedasService = MoedasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(moeda_entity_1.Moeda)),
    __param(1, (0, typeorm_1.InjectRepository)(cotacao_moeda_entity_1.CotacaoMoeda)),
    __param(2, (0, typeorm_1.InjectRepository)(conversao_historico_entity_1.ConversaoHistorico)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MoedasService);
//# sourceMappingURL=moedas.service.js.map