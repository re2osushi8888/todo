import { Body, Controller, Get, Post } from '@nestjs/common';
import { Item } from './items.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  @Get()
  findAll() {
    return 'This is findAll';
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: 'ON_SALE',
    };
    return this.ItemsService.create(item);
  }
}
