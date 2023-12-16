// import React, { useContext } from "react";
// import { apiV1 } from "../configs/ApiaConfig";
// import { GlobalContext } from "../context/GlobalContext";

// function Cart() {
//   const [globalState, globalDispatch] = useContext(GlobalContext);
//   const [dataCart, setDataCart] = useState([]);
//   const [dataProduct, setDataProduct] = useState([]);

//   console.log(globalState.dataCarts);

//   useEffect(() => {
//     getDataCart();
//     getDataProductApiById();
//   }, []);

//   const getDataCart = async () => {
//     try {
//       const response = await apiV1.get("/data-cart");
//       setDataCart(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getDataProductApiById = async () => {
//     try {
//       const response = await apiV1.get('/data-productbyid');
//       setDataProduct(response.data.data);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {globalState.dataCarts.length > 0 ? (
//         <>
//           <div className="mt-5">
//             <pre>{JSON.stringify(globalState.dataCarts, null, 2)}</pre>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="container null_cart alert alert-danger  ">
//             <h3 className="text-center">KERANJANG KOSONG</h3>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import Kopi from "../assets/kopi.jpg";
import Delete from "../assets/icons/delete.png";
// import Document from "../assets/icons/doc.png";
import { GlobalContext } from "../context/GlobalContext";
import { apiV1 } from "../configs/ApiaConfig";

function Cart() {
  const [globalState, globalDispath] = useContext(GlobalContext);
  const [dataCart, setDataCart] = useState([]);
  // const [dataProduct, setDataProduct] = useState([]);
  // console.log(globalState.dataCarts);

  useEffect(() => {
    getDataCart();
    // getDataProductApiById();
  }, []);

  const getDataCart = async () => {
    try {
      const token = localStorage.token;
      const response = await apiV1.get(
        "/data-cart",
        // { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("get data cart ", response);
      setDataCart(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addQtyProduct = async (id) => {
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
  const reduceQtyProduct = async (id) => {
    try {
      const token = localStorage.token;
      const response = await apiV1.post(
        "/reduceqtyproduct",
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
  const deleteCart = async (id) => {
    try {
      const token = localStorage.token;
      const response = await apiV1.delete(`/deletecart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getDataCart();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // let totalHarga = 0;
  // dataCart.forEach((item) => {
  //   totalHarga += item.Product.price * item.qty;
  // });

  // const getDataProductApiById = async () => {
  //   try {  
  //     const response = await apiV1.get("/data-products");
  //     setDataProduct(response.data.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      {dataCart.length > 0 ? (
        <>
          <div className="container cart">
            <p className="my_cart">My Cart</p>
            {/* <pre>{JSON.stringify(globalState.dataCarts, null, 2)}</pre> */}
            <div className="row ">
              {dataCart.map((item, index) => {
                return (
                  <div key={index} className="col-lg-7">
                    <div className="row">
                      <div className="col-lg-3">
                        <img className="img-fluid img_cart shadow-sm" src={Kopi} alt="kopi" />
                      </div>
                      <div className="col-lg-9">
                        <div className="pb-4">
                          <p className="card-title">{item.productName} </p>
                          <p className="card-text fw-bold mt-1">{item.price}</p>
                        </div>

                        {/* qty and delete */}
                        <span className="mt-4">Qty :</span>
                        <div className=" qty_delete_total">
                          <div className="input-group input_qty">
                            <span
                              className="input-group-text btn button_cart_qty"
                              onClick={() => {
                                reduceQtyProduct(item.id);
                              }}
                            >
                              -
                            </span>

                            <input type="text" className="form-control text-center" aria-label="Amount (to the nearest dollar)" value={item.qty} readOnly />

                            <span
                              className="input-group-text btn button_cart_qty"
                              onClick={() => {
                                addQtyProduct(item.Product.id);
                              }}
                            >
                              +
                            </span>
                          </div>

                          <div className="">
                            <p className="card-text fw-bold mt-1">{item.price}</p>
                          </div>

                          <div className="">
                            <button
                              className="btn button_cart_qty"
                              onClick={() => {
                                deleteCart(item.id);
                              }}
                            >
                              <img src={Delete} alt="delete" />
                            </button>
                          </div>
                        </div>
                        {/* end qty */}
                      </div>

                      <hr className="mt-4" />
                    </div>
                  </div>
                );
              })}

              <div className="d-flex">
                Total Harga :<p className="fw-bold ms-1">Rp. 10.000</p>
              </div>

              <div className="col-lg-4 py-5">
                <div className="row">
                  <div className="col">
                    <div className="">
                      <input className="form-control form_card" type="text" placeholder="Phone number" />
                    </div>
                    <div className="py-3">
                      <input className="form-control form_card" type="text" placeholder="Pos code" />
                    </div>
                    <div className="">
                      <input className="form-control address" type="text" placeholder="Address" />
                    </div>
                    <div className="py-3">
                      {/* <img src={Document} alt="doc" /> */}
                      <input className="form-control form_card" type="text" placeholder="Attache of Transaction" />
                    </div>

                    <button className="btn button_cart_pay w-100">Pay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container null_cart">
            <h3 className="text-center">KERANJANG KOSONG</h3>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
