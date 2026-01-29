import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./TrackingPage.css";

import productImage from "../../assets/images/products/athletic-cotton-socks-6-pairs.jpg";

function TrackingPage() {
  const { orderId } = useParams();

  // Sample tracking data - in a real app, this would come from an API
  const trackingData = {
    productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    productImage: productImage,
    quantity: 1,
    estimatedDelivery: "Monday, June 13",
    currentStatus: "shipped", // 'preparing', 'shipped', or 'delivered'
    progressPercent: 50,
  };

  const getProgressWidth = () => {
    switch (trackingData.currentStatus) {
      case "preparing":
        return "0%";
      case "shipped":
        return "50%";
      case "delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <>
      <Header />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {trackingData.estimatedDelivery}
          </div>

          <div className="product-info">{trackingData.productName}</div>

          <div className="product-info">Quantity: {trackingData.quantity}</div>

          <img
            className="product-image"
            src={trackingData.productImage}
            alt={trackingData.productName}
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${trackingData.currentStatus === "preparing" ? "current-status" : ""}`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${trackingData.currentStatus === "shipped" ? "current-status" : ""}`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${trackingData.currentStatus === "delivered" ? "current-status" : ""}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: getProgressWidth() }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
