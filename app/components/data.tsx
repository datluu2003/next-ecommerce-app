export interface ProductItemProps {
    _id: string;
    slug?: string;
    name: string;
    price: number;
    image: string;
    product: Product;
}
export interface Product {
  id: string;
  _id: string; // Thêm dòng này để đồng bộ với dữ liệu thực tế
  slug: string;
  name: string;
  image: string | string[];
  price: number;
  description: string;
  category?: { _id: string; name: string; image?: string };
  // Thêm các trường khác nếu cần
}