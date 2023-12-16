import React from "react";
import Kopi from "../assets/kopi.jpg";

function DetailTransaction() {
  return (
    <>
      <div className="container detail_transaction">
        <div className="row">
          <p className="my_trans">Detail Transaction</p>
          <div className="col-lg-2">
            <img className="img-fluid img_trans shadow-sm" src={Kopi} alt="kopi" />
          </div>
          <div className="col-lg-10">
            <div className="">
              <p className="card-title">Kopi Panas</p>
              <p className="card-text mt-1 fw-bold">Rp. 10.000</p>
            </div>
            <div className="mt-4">
              <p className="card-title">Qty :</p>
              <p className="card-text">Sub Total :</p>
            </div>
          </div>

          <hr className="mt-4 w-50" />

          <div className="d-flex">
            Total Harga :<p className="fw-bold ms-1">Rp. 10.000</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailTransaction;
