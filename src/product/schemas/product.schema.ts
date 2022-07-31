import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export class characteristic {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

@Schema({ timestamps: true })
export class Product {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop([String])
  categories: string[];

  @Prop([String])
  description: string[];

  @Prop()
  credit: number;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop()
  tags: string[];

  @Prop({ type: () => [characteristic] })
  characteristics: characteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
