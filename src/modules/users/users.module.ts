import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { AdressService } from 'src/core/services/adress.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AdressService],
  imports: [HttpModule],
})
export class UsersModule {}
