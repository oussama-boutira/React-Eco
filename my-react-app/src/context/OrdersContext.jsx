import { createContext, useContext, useState } from "react";
import { getDeliveryDate, deliveryOptions } from "../data/products";

const OrdersContext = createContext();

export function useOrders() {
  return useContext(OrdersContext);
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  function addOrder(cartItems, products) {
    const today = new Date();
    const orderDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    // Calculate total cost
    let totalCostCents = 0;
    const orderProducts = [];

    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (product) {
        totalCostCents += product.priceCents * cartItem.quantity;

        const deliveryOption =
          deliveryOptions.find((opt) => opt.id === cartItem.deliveryOptionId) ||
          deliveryOptions[0];

        totalCostCents += deliveryOption.priceCents;

        orderProducts.push({
          productId: product.id,
          image: product.image,
          name: product.name,
          quantity: cartItem.quantity,
          estimatedDeliveryTime: getDeliveryDate(deliveryOption.deliveryDays),
        });
      }
    });

    // Add 10% tax
    totalCostCents += Math.round(totalCostCents * 0.1);

    const newOrder = {
      id: crypto.randomUUID(),
      orderDate,
      totalCostCents,
      products: orderProducts,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    return newOrder.id;
  }

  function getOrder(orderId) {
    return orders.find((order) => order.id === orderId);
  }

  const value = {
    orders,
    addOrder,
    getOrder,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}
