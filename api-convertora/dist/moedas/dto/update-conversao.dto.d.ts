export declare class UpdateConversaoDto {
    moedaFrom?: string;
    moedaTo?: string;
    amount?: number;
    resultado?: number;
    taxaFrom?: number;
    taxaTo?: number;
}
declare const UpdateConversaoPartialDto_base: import("@nestjs/mapped-types").MappedType<Partial<UpdateConversaoDto>>;
export declare class UpdateConversaoPartialDto extends UpdateConversaoPartialDto_base {
}
export {};
