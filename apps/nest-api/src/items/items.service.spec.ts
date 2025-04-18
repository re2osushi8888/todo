import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { Item, ItemStatus } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

const mockPrismaService = {
  item: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

describe('ItemsService', () => {
  let itemsService: ItemsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, AuthModule],
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(itemsService).toBeDefined();
  });

  describe('findAll', () => {
    it('正常系', async () => {
      mockPrismaService.item.findMany.mockResolvedValueOnce([1]);

      const expected = [1];
      const result = await itemsService.findAll();

      expect(result).toEqual(expected);
    });
  });
  describe('findById', () => {
    it('正常系', async () => {
      const item: Item = {
        id: 'test-id1',
        name: 'test-item1',
        price: 100,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        userId: 'test-user1',
      };
      mockPrismaService.item.findUnique.mockResolvedValueOnce(item);

      const expected = item;
      const result = await itemsService.findById(item.id);

      expect(result).toEqual(expected);
      expect(mockPrismaService.item.findUnique).toHaveBeenCalledWith({
        where: {
          id: item.id,
        },
      });
    });
    it('異常系： 商品が存在しない', async () => {
      mockPrismaService.item.findUnique.mockResolvedValueOnce(null);

      await expect(itemsService.findById('test-id1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('create', () => {
    it('正常系', async () => {
      const item: CreateItemDto = {
        name: 'test-item1',
        price: 100,
        description: 'test-description',
      };
      const userId = 'test-user1';
      mockPrismaService.item.create.mockResolvedValueOnce(item);

      const expected = item;
      const result = await itemsService.create(item, userId);

      expect(result).toEqual(expected);
      expect(mockPrismaService.item.create).toHaveBeenCalledWith({
        data: {
          ...item,
          status: ItemStatus.ON_SALE,
          userId,
        },
      });
    });
  });
  describe('updateStatus', () => {
    it('正常系', async () => {
      const item: Item = {
        id: 'test-id1',
        name: 'test-item1',
        price: 100,
        description: 'test-description',
        status: ItemStatus.ON_SALE,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        userId: 'test-user1',
      };
      mockPrismaService.item.update.mockResolvedValueOnce({
        ...item,
        status: ItemStatus.SOLD_OUT,
      });

      const expected = {
        ...item,
        status: ItemStatus.SOLD_OUT,
      };
      const result = await itemsService.updateStatus(item.id);

      expect(result).toEqual(expected);
      expect(result.status).toBe(ItemStatus.SOLD_OUT);
      expect(mockPrismaService.item.update).toHaveBeenCalledWith({
        data: {
          status: ItemStatus.SOLD_OUT,
        },
        where: {
          id: item.id,
        },
      });
    });
  });
  describe('delete', () => {
    it('正常系', async () => {
      const id = 'test-id1';
      const userId = 'test-user1';
      await itemsService.delete(id, userId);

      expect(mockPrismaService.item.delete).toHaveBeenCalledWith({
        where: {
          id,
          userId,
        },
      });
    });
  });
});
