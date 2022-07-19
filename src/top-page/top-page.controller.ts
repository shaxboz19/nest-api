import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly configService: ConfigService) {}

  @Get('get/:alias')
  async get(@Param('alias') alias: string): Promise<TopPageModel> {
    return this.configService.get('DB_URL');
  }

  @Post('find')
  async getByCategory(@Body() dto: FindTopPageDto) {
    return 'test';
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return 'test';
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: TopPageModel) {
    return 'test';
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    return 'test';
  }
}
