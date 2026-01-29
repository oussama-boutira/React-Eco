import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useOrders } from "../../context/OrdersContext";
import { formatCurrency } from "../../data/products";
import "./TrackingPage.css";

function TrackingPage() {
  const { orderId } = useParams();
  const { getOrder } = useOrders();

  const order = getOrder(orderId);

  // If no order found, show a message
  if (!order || order.products.length === 0) {
    return (
      <>
        <Header />
        <div className="tracking-page">
          <div className="tracking-container">
            <Link className="back-to-orders-link link-primary" to="/orders">
              ← Back to all orders
            </Link>
            <div className="no-tracking">
              <div className="no-tracking-icon">📦</div>
              <h2>Order Not Found</h2>
              <p>We couldn't find tracking information for this order.</p>
              <Link to="/orders" className="button-primary back-button">
                View Your Orders
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Simulate tracking status based on order date
  const currentStatus = "shipped"; // 'preparing', 'shipped', or 'delivered'

  const trackingSteps = [
    { id: "ordered", label: "Order Placed", icon: "✓", completed: true },
    { id: "preparing", label: "Preparing", icon: "📦", completed: true },
    {
      id: "shipped",
      label: "Shipped",
      icon: "🚚",
      completed: currentStatus === "shipped" || currentStatus === "delivered",
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: "🏠",
      completed: currentStatus === "delivered",
    },
  ];

  const getProgressPercent = () => {
    switch (currentStatus) {
      case "preparing":
        return 33;
      case "shipped":
        return 66;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <>
      <Header />
      <div className="tracking-page">
        <div className="tracking-container">
          <Link className="back-to-orders-link link-primary" to="/orders">
            ← Back to all orders
          </Link>

          {/* Order Header */}
          <div className="tracking-header">
            <div className="tracking-header-info">
              <h1 className="tracking-title">Track Your Package</h1>
              <p className="order-id">Order ID: {order.id.slice(0, 8)}...</p>
              <p className="order-date">Ordered on {order.orderDate}</p>
            </div>
            <div className="order-total-badge">
              <span className="total-label">Order Total</span>
              <span className="total-amount">
                ${formatCurrency(order.totalCostCents)}
              </span>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="tracking-progress-section">
            <div className="estimated-delivery">
              <span className="delivery-icon">📅</span>
              <div className="delivery-info">
                <span className="delivery-label">Estimated Delivery</span>
                <span className="delivery-date">
                  {order.products[0].estimatedDeliveryTime}
                </span>
              </div>
            </div>

            <div className="tracking-steps">
              {trackingSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`tracking-step ${step.completed ? "completed" : ""} ${step.id === currentStatus ? "current" : ""}`}
                >
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-label">{step.label}</div>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`step-connector ${step.completed ? "completed" : ""}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${getProgressPercent()}%` }}
              ></div>
            </div>

            <div className="tracking-status-message">
              {currentStatus === "preparing" && (
                <p>🎁 Your order is being prepared for shipment.</p>
              )}
              {currentStatus === "shipped" && (
                <p>🚚 Your package is on its way! It's currently in transit.</p>
              )}
              {currentStatus === "delivered" && (
                <p>✅ Your package has been delivered. Enjoy!</p>
              )}
            </div>
          </div>

          {/* Products in Order */}
          <div className="tracking-products-section">
            <h2 className="section-title">Items in This Order</h2>
            <div className="tracking-products-grid">
              {order.products.map((product, index) => {
                const productImage = new URL(
                  `../../assets/images/products/${product.image}`,
                  import.meta.url,
                ).href;
                return (
                  <div key={index} className="tracking-product-card">
                    <div className="product-image-wrapper">
                      <img
                        src={productImage}
                        alt={product.name}
                        className="tracking-product-image"
                      />
                    </div>
                    <div className="tracking-product-details">
                      <h3 className="tracking-product-name">{product.name}</h3>
                      <p className="tracking-product-quantity">
                        Quantity: {product.quantity}
                      </p>
                      <p className="tracking-product-delivery">
                        <span className="delivery-badge">
                          Arriving: {product.estimatedDeliveryTime}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping Address (simulated) */}
          <div className="shipping-info-section">
            <h2 className="section-title">Shipping Information</h2>
            <div className="shipping-card">
              <div className="shipping-icon">📍</div>
              <div className="shipping-details">
                <p className="shipping-name">John Doe</p>
                <p className="shipping-address">123 Main Street</p>
                <p className="shipping-address">New York, NY 10001</p>
                <p className="shipping-address">United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
