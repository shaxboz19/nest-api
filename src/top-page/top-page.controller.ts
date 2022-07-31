import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { createTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly TopPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: createTopPageDto) {
    return await this.TopPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.TopPageService.getById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.TopPageService.delete(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: createTopPageDto,
  ) {
    const topPage = await this.TopPageService.updateById(id, dto);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @HttpCode(200)
  @Post('findByCategory')
  async find(@Body() dto: FindTopPageDto) {
    return await this.TopPageService.findByCategory(dto);
  }

  @Get('textSearch/:text')
  async findByText(@Param('text') text: string) {
    return await this.TopPageService.findByText(text);
  }
}
