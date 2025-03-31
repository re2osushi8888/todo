import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, status } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status,
      },
    });
  }
}
