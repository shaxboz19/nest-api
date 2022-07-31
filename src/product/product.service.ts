import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument } from 'src/review/schemas/review.schema';
import { CreateProductDto } from './dto/create.product';
import { FindProductDto } from './dto/find-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const product = this.ProductModel.create(dto);
    return product;
  }
  async findById(id: string): Promise<ProductDocument> {
    return await this.ProductModel.findById(id);
  }

  async delete(id: string): Promise<ProductDocument> | null {
    return await this.ProductModel.findByIdAndDelete(id);
  }

  async updateById(
    id: string,
    dto: CreateProductDto,
  ): Promise<ProductDocument> {
    return await this.ProductModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findWithReviews(dto: FindProductDto) {
    return this.ProductModel.aggregate<
      (ProductDocument & {
        review: ReviewDocument[];
        reviewCount: number;
        reviewAvg: number;
      })[]
    >([
      {
        $match: {
          categories: dto.category,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: dto.limit,
      },

      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' },
          reviewAvg: { $avg: '$reviews.rating' },
          reviews: {
            $function: {
              body: `function (reviews) {
                reviews.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                return reviews
              }`,
              args: ['$reviews'],
              lang: 'js',
            },
          },
        },
      },
    ]).exec();
  }
}
