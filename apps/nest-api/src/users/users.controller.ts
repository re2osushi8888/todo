import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':username')
  find(@Param('username') userName: string) {
    this.userService.find(Number(userName));
  }

  @Post()
  create() {}
}
