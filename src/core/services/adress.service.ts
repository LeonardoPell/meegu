import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Iadress } from '../interfaces/adress.model';

@Injectable()
export class AdressService {
  constructor(private readonly _httpService: HttpService) {}

  getAdressInfo(zipcode: string | number) {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    return this._httpService.get<Iadress>(url);
  }
}
