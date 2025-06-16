import { NavLink, useNavigate, useSearchParams } from "react-router";
import MobileLogo from "../assets/images/mobile-logo.png";
import LogoWhite from "../assets/images/logo-white.png";
import "./Header.css";
import { calculateCartQuantity } from "../utils/cart";
import { useState } from "react";

export function Header({ cart }) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  // const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProduct();
    } else if (event.key === "Escape") {
      setSearch("");
    }
  };

  const navigate = useNavigate();
  const searchProduct = () => {
    navigate(`/?search=${search}`);
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogo} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button className="search-button" onClick={searchProduct}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{calculateCartQuantity(cart)}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
