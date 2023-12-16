import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiV1 } from "../configs/ApiaConfig";
import { GlobalContext } from "../context/GlobalContext";

function Register() {
  const [globalState, globalDispacth] = useContext(GlobalContext);
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [fullnameInput, setFullnameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [TypeAlert, setTypeAlert] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (passwordInput !== confirmPasswordInput) {
        setMessageAlert("konfirmasi password tidak cocok");
      } else {
        setMessageAlert("");
        const response = await apiV1.post("/register", {
          email: emailInput,
          fullname: fullnameInput,
          password: passwordInput,
          level: "customer",
        });
        setMessageAlert(response.data.message);
        setTypeAlert(response.data.status);
      }
    } catch (error) {
      console.log(error);
      setMessageAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      if (localStorage.token) {
        const response = await apiV1.get("/check-token");
        globalDispacth({
          type: "PROCESS_LOGIN",
          data: response.data.user,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register container-fluid">
      <div className="container mt-5">
        <div className="row">
          <div className="col d-flex align-item-center justify-content-center">
            <div className="card regis_card mx-auto text-center shadow-sm">
              <div className="card-body regis_body">
                <form onSubmit={handleRegister}>
                  {messageAlert !== "" && (
                    <div className={`alert alert-dismissible fade show ${TypeAlert === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                      {messageAlert}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )}

                  <h2 className="text_register">Register</h2>
                  <div className="pt-3">
                    <input
                      type="text"
                      className="form-control form_register"
                      placeholder="Email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pt-3">
                    <input
                      type="text"
                      className="form-control form_register"
                      placeholder="Fullname"
                      value={fullnameInput}
                      onChange={(e) => {
                        setFullnameInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pt-3 input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form_register_pass"
                      placeholder="Password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                      }}
                    />
                    <span
                      className="input-group-text eye"
                      onClick={() => {
                        showPassword ? setShowPassword(false) : setShowPassword(true);
                      }}
                    >
                      {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                    </span>
                  </div>
                  <div className="py-3 input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control form_register_pass"
                      placeholder="Confirm Password "
                      value={confirmPasswordInput}
                      onChange={(e) => {
                        setConfirmPasswordInput(e.target.value);
                      }}
                    />
                    <span
                      className="input-group-text eye"
                      onClick={() => {
                        showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true);
                      }}
                    >
                      {showConfirmPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                    </span>
                  </div>
                  <a href="/login">
                    <button className="btn_login btn w-100" type="submit">
                      Register
                    </button>
                  </a>
                  <p className="pt-3">
                    Dont'have an account?
                    <a href="/login" className="link_ask_account ms-1">
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
