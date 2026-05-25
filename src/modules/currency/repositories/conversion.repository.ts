import { Inject, Injectable } from "@nestjs/common";
import { ConversionEntity } from "../entities/conversion.entity";

@Injectable()
export class ConversionRepository{
    private conversion: ConversionEntity[] = [];

    async save(conversion: ConversionEntity): Promise<ConversionEntity> {
        this.conversion.push(conversion);
        return conversion;

    }
}