import { CartItem, PlacedOrder } from '../types';

const CART_KEY = 'cafe_aldaw_cart_v1';
const LAST_ORDER_KEY = 'cafe_aldaw_last_order_v1';

export const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Storage quota or disabled
  }
};

export const saveLastOrder = (order: PlacedOrder): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {
    // Storage quota
  }
};

export const loadLastOrder = (): PlacedOrder | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
