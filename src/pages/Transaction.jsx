import React from "react";
import Kopi from "../assets/kopi.jpg";

function Transaction() {
  return (
    <>
      <div className="container transaction">
        <div className="row">
          <p className="my_trans">My Transaction</p>
          <div className="col-lg-2">
            <img className="img-fluid img_trans shadow-sm" src={Kopi} alt="kopi" />
          </div>
          <div className="col-lg-10">
            <div className="pb-4">
              <p className="card-title mb-2">Kopi Panas</p>
              <span className="belanja">Total belanja :</span>
              <p className="card-text fw-bold">Rp. 10.000</p>
            </div>
            <div className="mt-3">
              <a href="/detail-transaction">
                <button className="btn btn_detail_trans p-1">Detail</button>
              </a>
            </div>
          </div>
          <hr className="mt-4 w-50" />
        </div>
      </div>
    </>
  );
}

export default Transaction;
