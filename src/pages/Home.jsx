import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { apiV1 } from "../configs/ApiaConfig";

import Jumbo from "../assets/images/Jumbotron.png";

function Home() {
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState([]);
  const [globalState, globalDispath] = useContext(GlobalContext);
  console.log("dataCarts", globalState.dataCarts);

  // api product
  useEffect(() => {
    dataProduct();
  }, []);
  const dataProduct = async () => {
    const response = await apiV1.get("/data-products");
    setDataApi(response.data.data);
  };

  // end api product

  const handleOrder = (id) => {
    if (globalState.isLogin) {
      const dataById = dataApi.find((item) => item.id === id);
      // console.log(dataById);
      globalDispath({
        type: "ADD_PRODUCT_TO_CART",
        payload: dataById,
      });
    } else {
      navigate("/login");
    }
  };

  const getDataCart = async () => {
    try {
      const response = await apiV1.get("/data-cart");
      // setDataCarts(response.data.data);
      globalDispath({
        type: "PROCCESS_GET_DATA_CART",
        data: response.data.data,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder2 = async (id) => {
    try {
      const token = localStorage.token;
      const response = await apiV1.post(
        "/adddatacart",
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      getDataCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (id) => {
    if (globalState.isLogin) {
      const dataById = dataApi.find((item) => item.id === id);
      // console.log(dataById);
      navigate("/detail");
      globalDispath({
        type: "DATA_DETAILS",
        payload: dataById,
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container home">
        <div className="">
          <img className="img-fluid" src={Jumbo} alt="jumbo" />
        </div>
        <div className="pt-5">
          <p className="lets">Let's Order</p>
        </div>
        <div className="row">
          {dataApi.map((item, index) => {
            return (
              <div key={index} className="col-lg-2">
                <div className="card">
                  {/* <img src={Img} className="card-img-top" alt="card" /> */}
                  <div className="card-body card_body_product">
                    <p className="card-title">{item.productName}</p>
                    <p className="card-text fw-bold">Rp. {item.price}</p>
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          className="btn_detail btn w-100 p-1"
                          onClick={() => {
                            handleDetail(item.id);
                          }}
                        >
                          Detail
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn_order btn w-100 p-1"
                          onClick={() => {
                            handleOrder2(item.id);
                          }}
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <pre>{JSON.stringify(globalState.dataCarts, null, 2)}</pre>
        {/* <table className="table table-striped table-sm mt-3" border="2">
          <thead>
            <tr>
              <th>id</th>
              <th>nama produk</th>
              <th>harga</th>
            </tr>
          </thead>
          <tbody>
            {dataApi.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
    </>
  );
}

export default Home;
