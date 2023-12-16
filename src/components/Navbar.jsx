import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../assets/icons/brand.png";
import Cart from "../assets/icons/cart.png";
import Profile from "../assets/icons/profile.png";
import Trans from "../assets/icons/transaction.png";
import Logout from "../assets/icons/logout.png";
import IconProduct from "../assets/icons/iconproduct.png";

function Navbar() {
  const [globalState, globalDispath] = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={Brand} alt="brand" />
          <div className="mt-1 ms-1 coffee">Coffee</div>
        </Link>

        <ul className="navbar-nav ms-auto">
          {globalState.isLogin ? (
            <>
              {globalState.dataUser.level === "customer" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <div className="div_icon_cart">
                      {globalState.dataCarts.length > 0 ? (
                        <>
                          <span className="span_icon_cart">{globalState.dataCarts.length}</span>
                        </>
                      ) : (
                        <></>
                      )}
                      <img src={Cart} alt="cart" />
                    </div>
                  </Link>
                </li>
              )}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hello, {globalState.dataUser.fullname}
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/profile">
                      <img className="img_dropmenu me-2" src={Profile} alt="prof" />
                      Profile
                    </a>
                  </li>
                  {globalState.dataUser.level === "customer" && (
                    <li>
                      <a className="dropdown-item" href="/transaction">
                        <img className="img_dropmenu me-2" src={Trans} alt="trans" />
                        My Transaction
                      </a>
                    </li>
                  )}

                  {globalState.dataUser.level === "owner" && (
                    <>
                      <li>
                        <a className="dropdown-item" href="/product">
                          <img className="img_dropmenu me-2" src={IconProduct} alt="product" />
                          Product
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/admin-transaction">
                          <img className="img_dropmenu me-2" src={Trans} alt="transadmin" />
                          Transaction
                        </a>
                      </li>
                    </>
                  )}

                  <li>
                    <a
                      className="dropdown-item"
                      href="/login"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      <img className="img_dropmenu me-2" src={Logout} alt="logout" />
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <div className="d-flex gap-1">
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    <button className="btn btn_login_navbar">Login</button>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    <button className="btn btn_register_navbar">Register</button>
                  </a>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
