import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";
import { useSearch } from "../../context/SearchContext";
import "./HomePage.css";

function HomePage() {
  const { searchQuery } = useSearch();

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesKeywords = product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(query),
    );

    return matchesName || matchesKeywords;
  });

  return (
    <>
      <Header />
      <div className="home-page">
        {searchQuery && (
          <div className="search-results-info">
            {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
          </div>
        )}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results">
              No products found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
