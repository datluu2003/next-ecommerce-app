"use client";
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { useUniversalToast } from '@/app/hooks/useUniversalToast';
import UniversalToast from '@/app/components/UniversalToast';
import Breadcrumb from '@/app/product/components/Breadcrumb';
import ProductImages from '@/app/product/components/ProductImages';
import ProductInfo from '@/app/product/components/ProductInfo';
import QuantitySelector from '@/app/product/components/QuantitySelector';
import ActionButtons from '@/app/product/components/ActionButtons';
import TabContent from '@/app/product/components/TabContent';
import NotFound from '@/app/product/components/NotFound';
import type { Product } from '@/app/components/data';
import RelatedProducts from '@/app/product/components/RelatedProducts';

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

// Hàm fetch chi tiết sản phẩm theo slug
async function fetchProductDetail(slug: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/product/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data as Product; // API trả về { status, message, data }
  } catch (err) {
    console.error('Lỗi khi fetch chi tiết sản phẩm:', err);
    return null;
  }
}

export default function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = use(props.params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Hàm để cập nhật sản phẩm mà không reload trang
  const updateProduct = async (newSlug: string) => {
    setLoading(true);
    const data = await fetchProductDetail(newSlug);
    setProduct(data);
    setLoading(false);
    
    // Cập nhật URL mà không reload trang
    window.history.pushState({}, '', `/products/${newSlug}`);
  };

  useEffect(() => {
    updateProduct(slug);
  }, [slug]);

  if (loading && !product) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    </div>
  );
  
  if (!product) return <NotFound slug={slug} />;
  const imageUrl = getFirstImage(product.image);
  return <ProductDetailContent product={product} imageUrl={imageUrl} loading={loading} onProductChange={updateProduct} />;
}

function ProductDetailContent({ 
  product, 
  imageUrl, 
  loading, 
  onProductChange 
}: { 
  product: Product; 
  imageUrl: string; 
  loading?: boolean;
  onProductChange?: (slug: string) => Promise<void>;
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Universal Toast để thay thế toast cũ
  const { toast, showAddToCartToast, showBuyNowToast, hideToast } = useUniversalToast();
  
  // Redux dispatch để thêm vào giỏ hàng
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Reset quantity khi sản phẩm thay đổi
    setQuantity(1);
    setActiveTab('description');
    
    // Lấy sản phẩm liên quan cùng category, khác id hiện tại
    async function fetchRelated() {
      if (!product.category) return;
      
      try {
        const res = await fetch('http://localhost:8080/api/products', { cache: 'no-store' });
        const data = await res.json();
        const allProducts: Product[] = data.data || [];
        const related = allProducts.filter(
          (p) =>
            p._id !== product._id &&
            p.category &&
            product.category &&
            p.category._id === product.category._id
        ).slice(0, 4); // chỉ lấy 4 sản phẩm
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]);
      }
    }
    
    fetchRelated();
  }, [product._id, product.category]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    // Thêm sản phẩm vào Redux store
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
      slug: product.slug
    }));
    
    // Hiển thị toast notification
    showAddToCartToast(
      product.name,
      imageUrl,
      quantity,
      product.price
    );
  };
  
  const handleBuyNow = () => {
    // Thêm sản phẩm vào Redux store
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
      slug: product.slug
    }));
    
    // Hiển thị toast notification
    showBuyNowToast(
      product.name,
      imageUrl,
      quantity,
      product.price
    );
  };
  const totalPrice = product.price * quantity;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
        <Breadcrumb productName={product.name} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ProductImages imageUrl={imageUrl} productName={product.name} />
          <div className="space-y-8">
            <ProductInfo productName={product.name} price={product.price} shortDescription={product.description} />
            <QuantitySelector quantity={quantity} onChange={handleQuantityChange}>
              <span className="text-2xl font-bold text-green-700">Tổng: {totalPrice.toLocaleString()} VND</span>
            </QuantitySelector>
            <ActionButtons onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} totalPrice={totalPrice} />
            <RelatedProducts 
              products={relatedProducts.map(p => ({
                _id: p._id,
                name: p.name,
                image: (() => {
                  if (Array.isArray(p.image)) return p.image[0];
                  try {
                    const arr = JSON.parse(p.image);
                    if (Array.isArray(arr) && arr.length > 0) return arr[0];
                    return p.image;
                  } catch {
                    return p.image;
                  }
                })(),
                slug: p.slug,
              }))} 
              onProductClick={onProductChange}
              loading={loading}
            />
            {/* Có thể thêm các thông tin sản phẩm khác ở đây */}
          </div>
        </div>
        <TabContent activeTab={activeTab} setActiveTab={setActiveTab} description={product.description} />
      </div>
      
      {/* Universal Toast Notification */}
      <UniversalToast toast={toast} onClose={hideToast} />
    </div>
  );
}