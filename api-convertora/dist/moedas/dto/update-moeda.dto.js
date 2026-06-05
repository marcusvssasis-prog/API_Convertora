"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMoedaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_moeda_dto_1 = require("./create-moeda.dto");
class UpdateMoedaDto extends (0, mapped_types_1.PartialType)(create_moeda_dto_1.CreateMoedaDto) {
}
exports.UpdateMoedaDto = UpdateMoedaDto;
//# sourceMappingURL=update-moeda.dto.js.map