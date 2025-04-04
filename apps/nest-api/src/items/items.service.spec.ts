import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ItemsService } from './items.service';
import { Item, ItemStatus } from '@prisma/client';
import { NotFoundException } from '@nestjs/common/exceptions';

const mockPrismaService = {
  item: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
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
        userId: 'test-user1'
      }
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
});
