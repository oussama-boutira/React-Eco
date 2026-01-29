import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CheckoutHeader.css";

import logo from "../../assets/images/logo.png";
import mobileLogo from "../../assets/images/mobile-logo.png";
import lockIcon from "../../assets/images/icons/checkout-lock-icon.png";

function CheckoutHeader() {
  const { getCartQuantity } = useCart();
  const cartQuantity = getCartQuantity();

  return (
    <header className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={logo} alt="Amazon Logo" />
            <img className="mobile-logo" src={mobileLogo} alt="Amazon Logo" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {cartQuantity} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={lockIcon} alt="Secure checkout" />
        </div>
      </div>
    </header>
  );
}

export default CheckoutHeader;
