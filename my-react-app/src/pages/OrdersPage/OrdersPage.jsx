import Header from "../../components/Header/Header";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useOrders } from "../../context/OrdersContext";
import "./OrdersPage.css";

function OrdersPage() {
  const { orders } = useOrders();

  return (
    <>
      <Header />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <div className="no-orders">
              <p>You haven't placed any orders yet.</p>
              <a href="/" className="link-primary">
                Continue shopping
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
