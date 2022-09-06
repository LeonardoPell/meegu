import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { AdressService } from 'src/core/services/adress.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _adressService: AdressService,
  ) {}

  async create(data: CreateUserDto) {
    const validate = this.validateData(data);

    if (validate && validate.status && validate.status === 202) {
      return validate;
    }

    const adressInfo = await firstValueFrom(
      this._adressService.getAdressInfo(data.zipcode),
    );

    data.city = adressInfo.data.localidade;
    data.neighborhood = adressInfo.data.bairro;
    data.state = adressInfo.data.uf;
    data.street = adressInfo.data.logradouro;

    return this._prismaService.user.create({ data });
  }

  validateData(data: CreateUserDto | UpdateUserDto) {
    if (data.birthdate) {
      moment.locale('pt-br');
      data.birthdate = moment(data.birthdate).format();
      const currentYear = moment();

      const age = currentYear.diff(data.birthdate, 'years');

      if (age < 18) {
        return {
          status: 202,
          message: 'Cadastros são permitidos apenas para maiores de 18 anos',
        };
      }
    }

    if (data.name) {
      if (data.name.length > 100) {
        return {
          status: 202,
          message: 'Nome deve conter menos que 100 caracteres',
        };
      } else if (data.name.length < 2) {
        return {
          status: 202,
          message: 'Nome deve conter mais que 2 caracteres',
        };
      }
    }
  }

  findAll(name = '') {
    let where = {};

    if (name) {
      where = { name };
    }
    return this._prismaService.user.findMany({ where });
  }

  findOne(id: number) {
    return this._prismaService.user.findMany({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const validate = this.validateData(data);

    if (validate && validate.status && validate.status === 202) {
      return validate;
    }

    if (data.zipcode) {
      const adressInfo = await firstValueFrom(
        this._adressService.getAdressInfo(data.zipcode),
      );

      data.city = adressInfo.data.localidade;
      data.neighborhood = adressInfo.data.bairro;
      data.state = adressInfo.data.uf;
      data.street = adressInfo.data.logradouro;
    }

    data.updatedAt = moment().format();

    return this._prismaService.user.update({
      data,
      where: { id },
    });
  }

  remove(id: number) {
    return this._prismaService.user.delete({
      where: { id },
    });
  }
}
