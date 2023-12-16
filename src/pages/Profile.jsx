import React from "react";
import Foto from "../assets/profile.jpg";

function Profile() {
  return (
    <>
      <div className="container profile">
        <div className="row">
          <p className="titile_profile">Profile</p>
          <div className="col-lg-3 mt-3">
            <img src={Foto} alt="profile" className="img-fluid" />
          </div>
          <div className="col-lg-9 mt-4">
            <div className="">
              <input type="text" className="form-control form_profile" placeholder="Email" />
            </div>
            <div className="py-3">
              <input type="text" className="form-control form_profile" placeholder="Fullname" />
            </div>
            <div className=" ">
              <button className="btn btn_save_profile me-3">Save Update</button>
              <button className="btn btn_change_profile ">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
