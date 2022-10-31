import React, { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCartMenu } from "../components/ShoppingCartMenu";
import {useLocalStorage} from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextFn = {
  openCart: () => void;
  closeCart: () => void;
  getItemQty: (id: number) => number;
  increementCartQty: (id: number) => void;
  decreementCartQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQty: number;
  cartItems: cartItem[];
};

type cartItem = {
  id: number;
  qty: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextFn);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<cartItem[]>('shopping-cart', []);
  const [isOpen, setIsOpen] = useState(false);

  // get total items quantity
  const getItemQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  };

  // increese item quantity if it exis else add new item
  const increementCartQty = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // decreement cart item if the the item already exist else remove it entire
  const decreementCartQty = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  //remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };

  //toggle nav
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  //get total cart quantity
  const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQty,
        increementCartQty,
        decreementCartQty,
        removeFromCart,
        cartQty,
              openCart,
        cartItems,
        closeCart,
      }}
    >
          {children}
          <ShoppingCartMenu isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
