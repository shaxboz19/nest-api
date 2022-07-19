export class ProductModel {
  _id: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  categories: string[];
  description: string[];
  credit: number;
  calculatedRating: number;
  advantages: string;
  disAdvantages: string;
  tags: string;
  characteristics: {
    [key: string]: string;
  };
}
