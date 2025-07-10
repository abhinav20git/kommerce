import React, { useState } from "react";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { FaUserCircle } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
const Navbar = ({ onLogout, token, searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showSearch = location.pathname === "/product-page";
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    navigate("/sign-in");
  };
  const addProduct = () => {
    navigate("/create-product");
  };
  return (
    <div style={{ backgroundColor: "#DBEAFE" }}>
      <nav className="navbar navbar-expand-lg  gap-2 pt-1">
        <div className="container-fluid">
          <a className="navbar-brand my-2" href="/">
            <FaCartShopping size={30} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item fs-5">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive ? " active fw-bold text-primary " : "")
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item fs-5">
                <NavLink
                  to="/product-page"
                  className={({ isActive }) =>
                    "nav-link" +
                    (isActive ? " active fw-bold text-primary " : "")
                  }
                >
                  Products
                </NavLink>
              </li>
            </ul>
            {token && (
              <div className="d-flex">
                <ul className="navbar-nav  fw-medium ">
                  <button
                    className="border border-0 bg-transparent"
                    onClick={addProduct}
                  >
                    <GoPlusCircle size={30} />
                  </button>
                </ul>
                <ul className="navbar-nav  fw-medium ">
                  <li className="nav-item fs-5">
                    <NavLink to="/cart" className="nav-link ">
                      🛒 Cart{" "}
                      <span className="badge bg-primary">{totalItems}</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
            {showSearch && (
              <>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </>
            )}
            {token ? (
              <button
                className="border border-0 bg-transparent"
                onClick={() => setShowModal(true)}
              >
                <FaCircleUser size={40} />
              </button>
            ) : (
              <Link
                to="/sign-in"
                className="text-decoration-none fs-5 text-dark fw-bold"
              >
                Login Now
              </Link>
            )}
          </div>
        </div>

        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Options</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body d-flex flex-column gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/profile");
                      setShowModal(false);
                    }}
                  >
                    Profile
                  </button>
                  {!token ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/sign-in">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/sign-up">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleLogoutClick();
                        setShowModal(false);
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
