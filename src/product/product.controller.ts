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
import { CreateProductDto } from './dto/create.product';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND } from './product.constants';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.ProductService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.ProductService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  @Get('test')
  async getTest() {
    return 'test';
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', IdValidationPipe) id: string) {
    const product = await this.ProductService.delete(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: Product,
  ) {
    const product = await this.ProductService.updateById(id, dto);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return await this.ProductService.findWithReviews(dto);
  }
}
