export class ConversionParserResponseDto {
  consulta: {
    valor: string;
    de: string;
    para: string;
  };
  resultado: {
    valorConvertido: string;
    taxa: string;
    data: string;
    descricao: string;
  };
}
