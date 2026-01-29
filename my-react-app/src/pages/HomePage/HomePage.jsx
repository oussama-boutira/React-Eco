import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <Header />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
