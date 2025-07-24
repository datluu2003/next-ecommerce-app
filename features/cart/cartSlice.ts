import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, AddToCartPayload, UpdateQuantityPayload } from './cartTypes';

// Hàm tính tổng số lượng
const calculateTotalQuantity = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Hàm tính tổng tiền
const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Khởi tạo state từ localStorage (nếu có)
const loadCartFromStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        return {
          items: parsedCart.items || [],
          totalQuantity: calculateTotalQuantity(parsedCart.items || []),
          totalAmount: calculateTotalAmount(parsedCart.items || [])
        };
      }
    } catch (error) {
      console.error('Lỗi khi load cart từ localStorage:', error);
    }
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
  };
};

// Khởi tạo state rỗng để tránh hydration mismatch
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
      
      // Cập nhật tổng
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      
      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Cập nhật tổng
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      
      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          // Nếu số lượng <= 0 thì xóa sản phẩm
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
        
        // Cập nhật tổng
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
        
        // Lưu vào localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },

    // Tăng số lượng sản phẩm
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        
        // Cập nhật tổng
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
        
        // Lưu vào localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },

    // Giảm số lượng sản phẩm
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Nếu số lượng = 1 thì xóa sản phẩm
          state.items = state.items.filter(item => item.id !== action.payload);
        }
        
        // Cập nhật tổng
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
        
        // Lưu vào localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },

    // Xóa tất cả sản phẩm
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Xóa localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },

    // Load cart từ localStorage (dùng khi cần sync)
    loadCart: (state) => {
      const loaded = loadCartFromStorage();
      state.items = loaded.items;
      state.totalQuantity = loaded.totalQuantity;
      state.totalAmount = loaded.totalAmount;
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart, 
  loadCart 
} = cartSlice.actions;

export default cartSlice.reducer;
