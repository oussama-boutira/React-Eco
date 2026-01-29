import { useCart } from "../../context/CartContext";
import {
  getProduct,
  formatCurrency,
  getDeliveryDate,
  deliveryOptions,
} from "../../data/products";
import "./CartItem.css";

function CartItem({ cartItem }) {
  const { updateQuantity, removeFromCart, updateDeliveryOption } = useCart();
  const product = getProduct(cartItem.productId);

  if (!product) return null;

  const productImage = new URL(
    `../../assets/images/products/${product.image}`,
    import.meta.url,
  ).href;

  const selectedOption =
    deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId) ||
    deliveryOptions[0];

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {getDeliveryDate(selectedOption.deliveryDays)}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={productImage} alt={product.name} />

        <div className="cart-item-details">
          <div className="product-name">{product.name}</div>
          <div className="product-price">
            ${formatCurrency(product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <span className="quantity-label">{cartItem.quantity}</span>
            </span>
            <select
              className="update-quantity-select"
              value={cartItem.quantity}
              onChange={(e) =>
                updateQuantity(cartItem.productId, Number(e.target.value))
              }
              aria-label="Update quantity"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span
              className="delete-quantity-link link-primary"
              onClick={() => removeFromCart(cartItem.productId)}
            >
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions.map((option) => (
            <div className="delivery-option" key={option.id}>
              <input
                type="radio"
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
                checked={cartItem.deliveryOptionId === option.id}
                onChange={() =>
                  updateDeliveryOption(cartItem.productId, option.id)
                }
              />
              <div>
                <div className="delivery-option-date">
                  {getDeliveryDate(option.deliveryDays)}
                </div>
                <div className="delivery-option-price">
                  {option.priceCents === 0
                    ? "FREE Shipping"
                    : `$${formatCurrency(option.priceCents)} - Shipping`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
