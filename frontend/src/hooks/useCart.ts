'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Cart, CartItem, Product, ProductVariant } from '@/types';

const CART_STORAGE_KEY = 'ishop_cart';

function calculateCart(items: CartItem[]): Cart {
  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.price ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const discount = 0;
  const total = subtotal + shipping + tax - discount;
  return { items, subtotal, shipping, tax, discount, total };
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        setCart(calculateCart(items));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persistCart = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
    setCart(calculateCart(items));
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1, variant?: ProductVariant) => {
      setCart((prev) => {
        const existingIndex = prev.items.findIndex(
          (i) => i.product.id === product.id && i.variant?.id === variant?.id
        );
        let newItems: CartItem[];
        if (existingIndex >= 0) {
          newItems = prev.items.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id ?? 'default'}-${Date.now()}`,
            product,
            quantity,
            variant,
          };
          newItems = [...prev.items, newItem];
        }
        persistCart(newItems);
        return calculateCart(newItems);
      });
    },
    [persistCart]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const newItems = prev.items.filter((i) => i.id !== itemId);
        persistCart(newItems);
        return calculateCart(newItems);
      });
    },
    [persistCart]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      setCart((prev) => {
        const newItems =
          quantity <= 0
            ? prev.items.filter((i) => i.id !== itemId)
            : prev.items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
        persistCart(newItems);
        return calculateCart(newItems);
      });
    },
    [persistCart]
  );

  const clearCart = useCallback(() => {
    persistCart([]);
  }, [persistCart]);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, itemCount };
}
