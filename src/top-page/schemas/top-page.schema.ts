import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TopPageDocument = TopPage & Document;

export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class TopAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}
export enum TopLevelCategory {
  Courses = 'Courses',
  Services = 'Services',
  Books = 'Books',
  Products = 'Products',
}
@Schema({ timestamps: true })
export class TopPage {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: () => HhData })
  hh?: HhData;

  @Prop([TopAdvantage])
  advantages: TopAdvantage[];

  @Prop()
  seoText: string;

  @Prop([String])
  tags: string[];

  @Prop()
  tagsTitle: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage).index({
  '$**': 'text',
});
