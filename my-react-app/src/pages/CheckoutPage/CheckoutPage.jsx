import CheckoutHeader from "../../components/CheckoutHeader/CheckoutHeader";
import CartItem from "../../components/CartItem/CartItem";
import PaymentSummary from "../../components/PaymentSummary/PaymentSummary";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cart } = useCart();

  return (
    <>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.length === 0 ? (
              <div className="empty-cart-message">
                Your cart is empty. <a href="/">Continue shopping</a>
              </div>
            ) : (
              cart.map((cartItem) => (
                <CartItem key={cartItem.productId} cartItem={cartItem} />
              ))
            )}
          </div>

          {cart.length > 0 && <PaymentSummary />}
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
