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
const typeorm_3 = require("typeorm");
let MoedasService = class MoedasService {
    moedaRepo;
    cotacaoRepo;
    constructor(moedaRepo, cotacaoRepo) {
        this.moedaRepo = moedaRepo;
        this.cotacaoRepo = cotacaoRepo;
    }
    async create(dto) {
        try {
            const existente = await this.moedaRepo.findOne({
                where: { nome: dto.nome },
            });
            if (existente) {
                throw new common_1.ConflictException(`Moeda já existe com id ${existente.id}`);
            }
            const moeda = this.moedaRepo.create({ nome: dto.nome });
            return await this.moedaRepo.save(moeda);
        }
        catch (error) {
            if (error instanceof typeorm_3.QueryFailedError) {
                throw new common_1.ConflictException('Moeda já existe');
            }
            throw error;
        }
    }
    async addCotacao(id, valor) {
        const moeda = await this.moedaRepo.findOneBy({ id });
        if (!moeda) {
            throw new common_1.NotFoundException(`Moeda com ID ${id} não encontrada`);
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
            throw new common_1.NotFoundException(`Moeda com ID ${id} não encontrada`);
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
        if (!from || !to || !amount) {
            throw new common_1.BadRequestException('Voce precisa enviar from, to e amount no corpo (JSON) da requisicao');
        }
        const agora = new Date();
        const horaAtualStr = agora.toLocaleTimeString('pt-BR', {
            timeZone: 'America/Recife',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        let taxaFrom = this.getTaxaMoedaFixa(from, horaAtualStr);
        let taxaTo = this.getTaxaMoedaFixa(to, horaAtualStr);
        if (taxaFrom === null) {
            const moedaFrom = await this.moedaRepo.findOne({
                where: { nome: from },
                relations: { cotacoes: true }
            });
            if (!moedaFrom)
                throw new common_1.NotFoundException(`Moeda ${from} nao encontrada no banco`);
            if (!moedaFrom.cotacoes.length)
                throw new common_1.BadRequestException(`Moeda ${from} sem cotacao`);
            taxaFrom = moedaFrom.cotacoes
                .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
        }
        if (taxaTo === null) {
            const moedaTo = await this.moedaRepo.findOne({
                where: { nome: to },
                relations: { cotacoes: true }
            });
            if (!moedaTo)
                throw new common_1.NotFoundException(`Moeda ${to} nao encontrada no banco`);
            if (!moedaTo.cotacoes.length)
                throw new common_1.BadRequestException(`Moeda ${to} sem cotacao`);
            taxaTo = moedaTo.cotacoes
                .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
        }
        const resultado = amount * (taxaFrom / taxaTo);
        return {
            from,
            to,
            amount,
            resultado,
            taxaFrom,
            taxaTo,
            horarioReferencia: horaAtualStr
        };
    }
    getTaxaMoedaFixa(nomeDaMoeda, horarioAtual) {
        if (nomeDaMoeda == 'BRL')
            return 1.0;
        const hAtual = horarioAtual.substring(0, 5);
        if (nomeDaMoeda === 'USD') {
            if (hAtual >= '07:00' && hAtual < '12:00')
                return 5.00;
            if (hAtual >= '12:00' && hAtual < '17:00')
                return 5.20;
            return 7.00;
        }
        if (nomeDaMoeda === 'EUR') {
            if (hAtual >= '07:00' && hAtual < '12:00')
                return 5.40;
            if (hAtual >= '12:00' && hAtual < '17:00')
                return 7.60;
            return 8.00;
        }
        return null;
    }
};
exports.MoedasService = MoedasService;
exports.MoedasService = MoedasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(moeda_entity_1.Moeda)),
    __param(1, (0, typeorm_1.InjectRepository)(cotacao_moeda_entity_1.CotacaoMoeda)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MoedasService);
//# sourceMappingURL=moedas.service.js.map