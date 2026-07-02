"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  favorites: string[];
  recentlyViewed: Product[];
  isCartOpen: boolean;
}

const initialState: StoreState = {
  cart: [],
  favorites: [],
  recentlyViewed: [],
  isCartOpen: false,
};

type Action =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; delta: number }
  | { type: "TOGGLE_FAVORITE"; productId: string }
  | { type: "ADD_RECENTLY_VIEWED"; product: Product }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; open: boolean }
  | { type: "HYDRATE"; state: Partial<StoreState> }
  | { type: "CLEAR_CART" };

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (item) => item.product.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      const newCart = state.cart
        .map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: Math.max(0, item.quantity + action.delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, cart: newCart };
    }
    case "TOGGLE_FAVORITE": {
      const isFav = state.favorites.includes(action.productId);
      return {
        ...state,
        favorites: isFav
          ? state.favorites.filter((id) => id !== action.productId)
          : [...state.favorites, action.productId],
      };
    }
    case "ADD_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter(
        (p) => p.id !== action.product.id
      );
      return {
        ...state,
        recentlyViewed: [action.product, ...filtered].slice(0, 10),
      };
    }
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };
    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.open };
    case "HYDRATE":
      return { ...state, ...action.state };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

interface StoreContextType {
  state: StoreState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleFavorite: (productId: string) => void;
  addRecentlyViewed: (product: Product) => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isFavorite: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("helicorp-store");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "HYDRATE", state: parsed });
      }
    } catch {
      /* ignored */
    }
  }, []);

  // Persist to localStorage on state change
  useEffect(() => {
    try {
      const { isCartOpen: _, ...toSave } = state;
      localStorage.setItem("helicorp-store", JSON.stringify(toSave));
    } catch {
      /* ignored */
    }
  }, [state]);

  const addToCart = useCallback(
    (product: Product) => dispatch({ type: "ADD_TO_CART", product }),
    []
  );
  const removeFromCart = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_FROM_CART", productId }),
    []
  );
  const updateQuantity = useCallback(
    (productId: string, delta: number) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, delta }),
    []
  );
  const toggleFavorite = useCallback(
    (productId: string) => dispatch({ type: "TOGGLE_FAVORITE", productId }),
    []
  );
  const addRecentlyViewed = useCallback(
    (product: Product) => dispatch({ type: "ADD_RECENTLY_VIEWED", product }),
    []
  );
  const toggleCart = useCallback(
    () => dispatch({ type: "TOGGLE_CART" }),
    []
  );
  const setCartOpen = useCallback(
    (open: boolean) => dispatch({ type: "SET_CART_OPEN", open }),
    []
  );
  const clearCart = useCallback(
    () => dispatch({ type: "CLEAR_CART" }),
    []
  );

  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const isFavorite = useCallback(
    (productId: string) => state.favorites.includes(productId),
    [state.favorites]
  );

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        addRecentlyViewed,
        toggleCart,
        setCartOpen,
        clearCart,
        cartTotal,
        cartCount,
        isFavorite,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
