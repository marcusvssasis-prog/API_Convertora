"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConversaoPartialDto = exports.UpdateConversaoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateConversaoDto {
    moedaFrom;
    moedaTo;
    amount;
    resultado;
    taxaFrom;
    taxaTo;
}
exports.UpdateConversaoDto = UpdateConversaoDto;
class UpdateConversaoPartialDto extends (0, mapped_types_1.PartialType)(UpdateConversaoDto) {
}
exports.UpdateConversaoPartialDto = UpdateConversaoPartialDto;
//# sourceMappingURL=update-conversao.dto.js.map