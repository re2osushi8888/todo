import { Injectable } from '@nestjs/common';
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

  create(item: Item) {
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
