import { Injectable } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(createItemDto: CreateItemDto) {
    const item: Item = {
      ...createItemDto,
      status: 'ON_SALE',
    };
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item | undefined {
    const item = this.findById(id);
    if (item === undefined) return;
    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string) {
    this.items = this.items.filter((items) => items.id !== id);
  }
}
