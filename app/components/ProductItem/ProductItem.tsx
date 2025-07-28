import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/cartSlice';

// Nhận props sản phẩm
interface ProductItemProps {
  product: {
    _id: string;
    slug?: string;
    name: string;
    price: number;
    image: string;
  };
}

// Hàm tách riêng xử lý lấy ảnh đầu tiên từ dữ liệu image
function getFirstImage(image: string | string[]): string {
  if (typeof image === 'string') {
    try {
      const arr = JSON.parse(image);
      if (Array.isArray(arr) && arr.length > 0) return arr[0];
      return image;
    } catch {
      return image;
    }
  }
  if (Array.isArray(image) && image.length > 0) return image[0];
  return '';
}

export default function ProductItem({ product }: ProductItemProps) {
  const dispatch = useAppDispatch();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn không cho Link navigate
    e.stopPropagation(); // Ngăn event bubbling
    
    const imageUrl = getFirstImage(product.image);
    
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imageUrl,
      slug: product.slug
    }));
  };

  return (
    <Link
      href={product.slug ? `/products/${product.slug}` : '#'}
      className="rounded-xl shadow-lg overflow-hidden bg-white hover:scale-105 transition-transform duration-200 border border-gray-100 flex flex-col"
      prefetch={false}
    >
      <Image
        src={getFirstImage(product.image)}
        alt={product.name}
        width={300}
        height={208}
        className="w-full h-52 object-cover object-center"
      />
      <div className="flex-1 flex flex-col justify-between p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px] font-sans">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sl font-bold text-green-600 font-sans">{product.price.toLocaleString()} VND</span>
          <button 
            className="ml-2 px-4 py-1 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition font-sans"
            onClick={handleAddToCart}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </Link>
  );
}
