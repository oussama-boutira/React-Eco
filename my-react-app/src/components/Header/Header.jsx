import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Header.css";

import logoWhite from "../../assets/images/logo-white.png";
import mobileLogoWhite from "../../assets/images/mobile-logo-white.png";
import searchIcon from "../../assets/images/icons/search-icon.png";
import cartIcon from "../../assets/images/icons/cart-icon.png";

function Header() {
  const { getCartQuantity } = useCart();
  const cartQuantity = getCartQuantity();

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

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="search-button">
          <img className="search-icon" src={searchIcon} alt="Search" />
        </button>
      </div>

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
