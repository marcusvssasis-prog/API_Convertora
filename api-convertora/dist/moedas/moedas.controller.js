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
exports.MoedasController = void 0;
const common_1 = require("@nestjs/common");
const moedas_service_1 = require("./moedas.service");
const create_moeda_dto_1 = require("./dto/create-moeda.dto");
const update_moeda_dto_1 = require("./dto/update-moeda.dto");
let MoedasController = class MoedasController {
    moedasService;
    constructor(moedasService) {
        this.moedasService = moedasService;
    }
    create(createMoedaDto) {
        return this.moedasService.create(createMoedaDto);
    }
    findAll() {
        return this.moedasService.findAll();
    }
    findOne(id) {
        return this.moedasService.findOne(+id);
    }
    update(id, updateMoedaDto) {
        return this.moedasService.update(+id, updateMoedaDto);
    }
    remove(id) {
        return this.moedasService.remove(+id);
    }
};
exports.MoedasController = MoedasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_moeda_dto_1.CreateMoedaDto]),
    __metadata("design:returntype", void 0)
], MoedasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MoedasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoedasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_moeda_dto_1.UpdateMoedaDto]),
    __metadata("design:returntype", void 0)
], MoedasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoedasController.prototype, "remove", null);
exports.MoedasController = MoedasController = __decorate([
    (0, common_1.Controller)('moedas'),
    __metadata("design:paramtypes", [moedas_service_1.MoedasService])
], MoedasController);
//# sourceMappingURL=moedas.controller.js.map