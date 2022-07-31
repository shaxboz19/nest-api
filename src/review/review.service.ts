import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly ReviewModel: Model<ReviewDocument>,
  ) {}

  async create(reviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const review = this.ReviewModel.create({
      ...reviewDto,
      productId: new Types.ObjectId(reviewDto.productId),
    });
    return review;
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.ReviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(id: string): Promise<ReviewDocument[]> {
    return this.ReviewModel.find({ productId: id });
  }

  async deleteByProductId(id: string) {
    return this.ReviewModel.deleteMany({ productId: id });
  }
}
