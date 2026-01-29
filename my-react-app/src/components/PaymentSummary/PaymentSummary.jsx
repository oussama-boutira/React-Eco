import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import {
  getProduct,
  formatCurrency,
  deliveryOptions,
  products,
} from "../../data/products";
import "./PaymentSummary.css";

function PaymentSummary() {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  // Calculate totals
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (product) {
      productPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption =
        deliveryOptions.find(
          (option) => option.id === cartItem.deliveryOptionId,
        ) || deliveryOptions[0];

      shippingPriceCents += deliveryOption.priceCents;
    }
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  function handlePlaceOrder() {
    // Add order to orders context
    addOrder(cart, products);

    // Clear the cart
    clearCart();

    // Navigate to orders page
    navigate("/orders");
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
        <div>Items ({totalItems}):</div>
        <div className="payment-summary-money">
          ${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          ${formatCurrency(shippingPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          ${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${formatCurrency(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          ${formatCurrency(totalCents)}
        </div>
      </div>

      <button
        className="place-order-button button-primary"
        onClick={handlePlaceOrder}
      >
        Place your order
      </button>
    </div>
  );
}

export default PaymentSummary;
