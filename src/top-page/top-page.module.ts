import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './schemas/top-page.schema';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
  ],
  controllers: [TopPageController],
  providers: [ConfigService, TopPageService],
})
export class TopPageModule {}
