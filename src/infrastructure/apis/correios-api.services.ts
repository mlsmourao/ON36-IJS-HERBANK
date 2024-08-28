import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CorreiosApiService {
  constructor(private readonly httpService: HttpService) {}

  async consultaCep(cep: string): Promise<string | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`)
      );
      if (response.data.erro) {
        return null;
      }
      return `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade}, ${response.data.uf}`;
    } catch (error) {
      return null;
    }
  }
}
