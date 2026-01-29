import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(productId, quantity = 1) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [
          ...prevCart,
          {
            productId,
            quantity,
            deliveryOptionId: "1",
          },
        ];
      }
    });
  }

  function removeFromCart(productId) {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId),
    );
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  }

  function updateDeliveryOption(productId, deliveryOptionId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, deliveryOptionId } : item,
      ),
    );
  }

  function getCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDeliveryOption,
    getCartQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
