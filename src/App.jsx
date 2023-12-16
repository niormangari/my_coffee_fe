import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";
import { useContext, useEffect } from "react";
import { apiV1, setToken } from "./configs/ApiaConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/style.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import DetailTransaction from "./pages/DetailTransaction";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import AdminTransaction from "./pages/AdminTransaction";
import NotFound from "./pages/NotFound";
import PrivateRouter from "./components/PrivateRouter";
import PrivateRouterLevel from "./components/PrivateRouterLevel";
import PublicRoute from "./components/PublicRouter";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  const [globalState, globalDispath] = useContext(GlobalContext);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      if (localStorage.token) {
        const response = await apiV1.get("/check-token");
        globalDispath({
          type: "PROCESS_LOGIN",
          data: response.data.user,
        });
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRouterLevel />}>
            <Route path="/admin-transaction" element={<AdminTransaction />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/product" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>

          <Route element={<PrivateRouter />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/transaction" element={<Transaction />} />
            <Route path="/detail-transaction" element={<DetailTransaction />} />
            <Route path="/detail" element={<Detail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
