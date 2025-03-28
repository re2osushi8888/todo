import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService){}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  findById(id: string): Item {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const {name,price,description} = createItemDto
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE
      }
    })
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
