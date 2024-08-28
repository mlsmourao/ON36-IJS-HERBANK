export class CepConversionAdapter {
  private static readonly CEP_LENGTH = 8;

  static convertCepToString(cep: number | string): string | null {
    if (typeof cep === 'number') {
      cep = cep.toString();
    }

    if (typeof cep !== 'string' || cep.length !== this.CEP_LENGTH || isNaN(Number(cep))) {
      return null;
    }

    return cep;
  }
}
