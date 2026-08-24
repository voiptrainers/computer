import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' };

const STORAGE_KEY = 'tic-cart-items';

function loadInitialState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { items: JSON.parse(raw), isDrawerOpen: false };
  } catch {
    // ignore malformed storage
  }
  return { items: [], isDrawerOpen: false };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          )
        : [...state.items, { product: action.product, quantity: action.quantity }];
      return { ...state, items, isDrawerOpen: true };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  }, []);
  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  }, []);
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), []);

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );
  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    isDrawerOpen: state.isDrawerOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openDrawer,
    closeDrawer,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
