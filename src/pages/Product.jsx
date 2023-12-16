import React, { useEffect, useState } from "react";
import axios from "axios";

function Product() {
  const [state, setState] = useState([]);

  useEffect(() => {
    dataProduct();
  }, []);
  const dataProduct = async () => {
    const response = await axios.get("http://localhost:3001/api/data-products");
    // console.log("data product", response.data.data);
    setState(response.data.data);
  };
  return (
    <>
      <div className="container product">
        <div className="d-flex justify-content-between">
          <p className="text_product">Product</p>

          <button className="btn btn_addproduct">
            <i className="bi bi-file-earmark-plus me-2"></i>
            Add Product
          </button>
        </div>
        <table className="table table-striped table-sm mt-3" border="2">
          <thead>
            <tr>
              <th className="col-lg-2">No</th>
              <th className="col-lg-4">Product Name</th>
              <th className="col-lg-2">Price</th>
              <th className="col-lg-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, index) => {
              return (  
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn me-3 btn_detail_product">Detail</button>
                    <button className="btn btn_edit_product">Edit</button>
                    <button className="btn ms-3 btn_delete_product">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
