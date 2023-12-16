import React, { useContext } from "react";
import Kopi from "../assets/kopi.jpg";
import { GlobalContext } from "../context/GlobalContext";

function Detail() {
  const [globalState] = useContext(GlobalContext);
  // console.log(globalState.dataDetails);

  return (
    <>
      <div className="container detail">
        <p className="detail_product">Detail Product</p>
        <div className="row">
          <div className="col-lg-2">
            <img className="img-fluid img_detail shadow-sm" src={Kopi} alt="kopi" />
          </div>
          <div className="col-lg-10">
            <div className="">
              <p className="card-title">{globalState.dataDetails.productName}</p>
              <p className="card-text fw-bold">Rp. {globalState.dataDetails.price}</p>
            </div>
            <div className="mt-5">
              <p className="card-title">Berat Bersih :</p>
              <p className="card-text fw-bold">250ml</p>
            </div>
            <div className="mt-3">
              <button className="btn btn_order_in_detail">Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
