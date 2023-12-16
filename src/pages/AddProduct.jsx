import React, { useState } from "react";
import Kopi from "../assets/kopi.jpg";
import { apiV1 } from "../configs/ApiaConfig";

function AddProduct() {
  const [changeImage, setChangeImage] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [productNameInput, setProductNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (changeImage === "") {
        console.log("file gambar harus ada");
        return;
      }
      const response = await apiV1.post(
        "/add-product",
        {
          img: uploadImage,
          productName: productNameInput,
          price: priceInput,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container add_product">
        <div className="row">
          <p className="text_addproduct">Add Product</p>
          <div className="col-lg-4">
            <form onSubmit={handleAddProduct} encType="multipart/form-data">
              {/* <div className="">
                <input type="text" className="form-control form_addproduct" placeholder="Product Name" />
              </div>
              <div className="py-3">
                <input type="text" className="form-control form_addproduct" placeholder="Price" />
              </div> */}
              <div className="">
                <img className="img-fluid img_addproduct shadow-sm" src={changeImage === "" ? Kopi : changeImage} alt="changeimage" />
              </div>

              <div className="pt-3">
                <input
                  type="file"
                  className="form-control form_addproduct"
                  id="inputGroupFile02"
                  onChange={(e) => {
                    const img = e.target.files;
                    setChangeImage(URL.createObjectURL(e.target.files[0]));
                    setUploadImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control form_addproduct"
                  placeholder="Nama Product"
                  value={productNameInput}
                  onChange={(e) => {
                    setProductNameInput(e.target.value);
                  }}
                />
              </div>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control form_addproduct"
                  placeholder="Harga"
                  value={priceInput}
                  onChange={(e) => {
                    setPriceInput(e.target.value);
                  }}
                />
              </div>

              <div className="py-3">
                <button type="submit" className="btn btn_save_addproduct w-100">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
