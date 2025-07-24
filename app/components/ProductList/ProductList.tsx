import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import type { Product } from '@/app/components/data'; // Đảm bảo import đúng type

type Props = {
  products: Product[];
};

function getRandomProducts(products: Product[], count: number): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function ProductList({ products }: Props) {
  // Lấy 8 sản phẩm ngẫu nhiên
  const hotProducts = getRandomProducts(products, 8);

  // Lọc ra những sản phẩm không nằm trong hotProducts
  const hotIds = new Set(hotProducts.map((p) => p.id));
  const normalProducts = products.filter((p) => !hotIds.has(p.id));

  return (
    <div className="space-y-10">
      {/* Sản phẩm hot */}
      {hotProducts.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={{
                  ...product,
                  _id: product.id,
                  image: Array.isArray(product.image) ? product.image[0] : product.image,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tất cả sản phẩm */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {normalProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={{
                ...product,
                _id: product.id,
                image: Array.isArray(product.image) ? product.image[0] : product.image,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
