"use client";
import React, { useState, useEffect, useContext } from "react";

interface ICartContextProps {
  cartItems: string[];
  addItemToCart: (itemId: string) => void;
  deleteItemFromCart: (itemId: string) => void;
  isInCart: (itemId: string) => boolean;
}

export const CartContext = React.createContext<ICartContextProps | undefined>(
  undefined,
);

export const CartContextProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  // Initialize cartItems from local storage on component mount
  useEffect(() => {
    const storedItems: string | null = localStorage.getItem("cartItems");
    const initialCartItems: string[] = storedItems
      ? JSON.parse(storedItems)
      : [];
    setCartItems(initialCartItems);
  }, []);

  // Function to add a shopping item (ID) to cart and local storage
  const addItemToCart = (itemId: string): void => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, itemId];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  // Function to delete a shopping item (ID) from cart and local storage
  const deleteItemFromCart = (itemId: string): void => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (cartItem) => cartItem !== itemId,
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const isInCart = (itemId: string): boolean => {
    return cartItems.includes(itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        deleteItemFromCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
