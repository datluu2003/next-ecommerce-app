// Interface cho một item trong giỏ hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

// Interface cho state của giỏ hàng
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Interface cho payload khi thêm sản phẩm vào giỏ hàng
export interface AddToCartPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

// Interface cho payload khi cập nhật số lượng
export interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}

// Interface cho toast data
export interface ToastData {
  id: string;
  type: 'add-to-cart' | 'buy-now' | 'remove-item' | 'clear-cart' | 'update-quantity';
  productName: string;
  productImage?: string;
  quantity?: number;
  price?: number;
  totalPrice?: number;
  message?: string;
}