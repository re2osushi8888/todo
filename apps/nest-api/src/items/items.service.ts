import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { v4 as uuid } from 'uuid';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item | undefined {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  create(createItemDto: CreateItemDto) {
    const item: Item = {
      id: uuid(),
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
