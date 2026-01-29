import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatCurrency, getRatingImage } from "../../data/products";
import "./ProductCard.css";

import checkmarkIcon from "../../assets/images/icons/checkmark.png";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const productImage = new URL(
    `../../assets/images/products/${product.image}`,
    import.meta.url,
  ).href;
  const ratingImage = new URL(
    `../../assets/images/ratings/${getRatingImage(product.rating.stars)}`,
    import.meta.url,
  ).href;

  function handleAddToCart() {
    addToCart(product.id, quantity);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  }

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={productImage} alt={product.name} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={ratingImage}
          alt={`${product.rating.stars} stars`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">${formatCurrency(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          aria-label="Select quantity"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${showAdded ? "visible" : ""}`}>
        <img src={checkmarkIcon} alt="" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
