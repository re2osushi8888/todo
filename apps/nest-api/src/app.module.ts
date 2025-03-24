import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ItemsController } from './items/items.controller.js';

@Module({
  imports: [UsersModule],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule {}
