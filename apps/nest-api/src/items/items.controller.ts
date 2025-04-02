import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Item } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { RequestUser } from 'src/types/requestUser';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    await this.itemsService.delete(id, req.user.id);
  }
}
