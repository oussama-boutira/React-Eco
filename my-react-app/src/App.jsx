import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { OrdersProvider } from "./context/OrdersContext";
import HomePage from "./pages/HomePage/HomePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import TrackingPage from "./pages/TrackingPage/TrackingPage";

function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/tracking/:orderId" element={<TrackingPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </OrdersProvider>
    </CartProvider>
  );
}

export default App;
