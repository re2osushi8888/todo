import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockPrismaService = {
  item: {
    findMany: vi.fn(),
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
});
