import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  name: string;
  birthdate: string | Date;
  document: string;
  acceptedTerms?: boolean;
  zipcode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
