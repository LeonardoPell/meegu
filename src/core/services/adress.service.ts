import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Iadress } from '../interfaces/adress.model';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AdressService {
  constructor(private readonly _httpService: HttpService) {}

  getAdressInfo(zipcode: string | number): Promise<AxiosResponse<Iadress>> {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    return firstValueFrom(this._httpService.get<Iadress>(url));
  }
}
