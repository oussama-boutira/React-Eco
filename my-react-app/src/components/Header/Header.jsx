import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";
import "./Header.css";

import logoWhite from "../../assets/images/logo-white.png";
import mobileLogoWhite from "../../assets/images/mobile-logo-white.png";
import searchIcon from "../../assets/images/icons/search-icon.png";
import cartIcon from "../../assets/images/icons/cart-icon.png";

function Header() {
  const { getCartQuantity } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const cartQuantity = getCartQuantity();

  function handleSearch(e) {
    e.preventDefault();
    // Search is already applied in real-time via searchQuery state
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <header className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src={logoWhite} alt="Amazon Logo" />
          <img
            className="mobile-logo"
            src={mobileLogoWhite}
            alt="Amazon Logo"
          />
        </Link>
      </div>

      <form className="middle-section" onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
          aria-label="Search products"
        />
        <button className="search-button" type="submit">
          <img className="search-icon" src={searchIcon} alt="Search" />
        </button>
      </form>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} alt="Cart" />
          <div className="cart-quantity">{cartQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
