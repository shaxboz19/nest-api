import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPage, TopPageDocument } from './schemas/top-page.schema';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly TopPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: createTopPageDto): Promise<TopPageDocument> {
    return await this.TopPageModel.create(dto);
  }
  async getById(id: string): Promise<TopPageDocument> {
    return await this.TopPageModel.findById(id);
  }
  async delete(id: string): Promise<TopPageDocument> | null {
    return await this.TopPageModel.findByIdAndDelete(id);
  }
  async updateById(
    id: string,
    dto: createTopPageDto,
  ): Promise<TopPageDocument> {
    return await this.TopPageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findByCategory(dto: FindTopPageDto): Promise<TopPageDocument[]> {
    return await this.TopPageModel.aggregate([
      {
        $match: {
          firstCategory: dto.firstCategory,
        },
      },
      {
        $group: {
          _id: { secondCategory: '$secondCategory' },
          pages: {
            $push: {
              title: '$title',
            },
          },
        },
      },
    ]);
  }
  async findByText(text: string): Promise<TopPageDocument[]> {
    return await this.TopPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }
}
