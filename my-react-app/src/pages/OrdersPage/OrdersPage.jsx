import Header from "../../components/Header/Header";
import OrderCard from "../../components/OrderCard/OrderCard";
import "./OrdersPage.css";

// Sample orders data for demonstration
const sampleOrders = [
  {
    id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    orderDate: "August 12",
    totalCostCents: 3506,
    products: [
      {
        image: "athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        estimatedDeliveryTime: "August 15",
        quantity: 1,
      },
      {
        image: "adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        estimatedDeliveryTime: "August 19",
        quantity: 2,
      },
    ],
  },
  {
    id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
    orderDate: "June 10",
    totalCostCents: 4190,
    products: [
      {
        image: "intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        estimatedDeliveryTime: "June 17",
        quantity: 2,
      },
    ],
  },
];

function OrdersPage() {
  return (
    <>
      <Header />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {sampleOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
