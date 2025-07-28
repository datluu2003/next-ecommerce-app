"use client";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import type { Product } from '../components/data';

interface ShowSPProps {
  type?: 'featured' | 'hot';
  title?: string;
}

export default function ShowSP({ type = 'featured', title = 'Sản Phẩm Nổi Bật' }: ShowSPProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          cache: "no-store"
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Lỗi khi gọi API: ${res.status} - ${errorText}`);
        }
        const data = await res.json();
        interface RawProduct {
          _id: string;
          slug: string;
          name: string;
          image: string | string[];
          price: number;
          description: string;
          category?: { _id: string; name: string; image?: string };
        }
        const fixedProducts: Product[] = (data.data as RawProduct[]).map((item: RawProduct) => {
          let image = item.image;
          if (typeof image === 'string' && image.startsWith('[')) {
            try {
              const arr = JSON.parse(image);
              if (Array.isArray(arr) && arr.length > 0) image = arr[0];
            } catch {}
          }
          if (Array.isArray(image) && image.length > 0) image = image[0];
          return {
            id: item._id,
            _id: item._id,
            slug: item.slug,
            name: item.name,
            image: image as string,
            price: item.price,
            description: item.description,
            category: item.category,
          };
        });
        let filtered = fixedProducts;
        if (type === 'hot') {
          filtered = [...fixedProducts].sort((a, b) => b.price - a.price).slice(0, 8);
        } else {
          filtered = fixedProducts.slice(0, 8);
        }
        setProducts(filtered);
      } catch {
        setError("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  if (loading) return <div className="text-center py-8">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <section className="mb-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-green-700 tracking-tight drop-shadow font-sans">{title}</h2>
      <ProductList products={products} />
    </section>
  );
}