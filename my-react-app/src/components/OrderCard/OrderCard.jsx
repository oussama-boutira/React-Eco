import { Link } from "react-router-dom";
import "./OrderCard.css";

import buyAgainIcon from "../../assets/images/icons/buy-again.png";

function OrderCard({ order }) {
  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{order.orderDate}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>
              $
              {order.totalCostCents
                ? (order.totalCostCents / 100).toFixed(2)
                : "0.00"}
            </div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{order.id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {order.products.map((orderProduct, index) => {
          const productImage = new URL(
            `../../assets/images/products/${orderProduct.image}`,
            import.meta.url,
          ).href;

          return (
            <div className="order-product-row" key={index}>
              <div className="product-image-container">
                <img src={productImage} alt={orderProduct.name} />
              </div>

              <div className="product-details">
                <div className="product-name">{orderProduct.name}</div>
                <div className="product-delivery-date">
                  Arriving on: {orderProduct.estimatedDeliveryTime}
                </div>
                <div className="product-quantity">
                  Quantity: {orderProduct.quantity}
                </div>
                <button className="buy-again-button button-primary">
                  <img className="buy-again-icon" src={buyAgainIcon} alt="" />
                  <span className="buy-again-message">Add to Cart</span>
                </button>
              </div>

              <div className="product-actions">
                <Link to={`/tracking/${order.id}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderCard;
