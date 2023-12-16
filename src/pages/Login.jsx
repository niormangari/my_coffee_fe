import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiV1 } from "../configs/ApiaConfig";
import { GlobalContext } from "../context/GlobalContext";

function Login() {
  const navigate = useNavigate();
  const [globalState, globalDispath] = useContext(GlobalContext);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      if (localStorage.token) {
        const response = await apiV1.get("/check-token");
        console.log(response);
        globalDispath({
          type: "PROCESS_LOGIN",
          data: response.data.user,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiV1.post("/login", {
        email: emailInput,
        password: passwordInput,
      });
      setMessageAlert(response.data.message);
      setTypeAlert(response.data.status);
      setTimeout(() => {
        globalDispath({
          type: "PROCESS_LOGIN",
          data: response.data.data,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessageAlert(error.response.data.message);
      setTypeAlert(error.response.data.status);
    }
  };

  return (
    <div className="login container-fluid">
      <div className="container mt-5">
        <div className="row">
          <div className="col d-flex align-item-center justify-content-center">
            <div className="card login_card mx-auto text-center shadow-sm">
              <div className="card-body login_body">
                <form onSubmit={handleLogin}>
                  {messageAlert !== "" && (
                    <div className={`d-flex alert alert-dismissible fade show ${typeAlert === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                      {typeAlert === "success" && (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      <div className=" ms-2">{messageAlert}</div>
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )}

                  <h2 className="text-login">Login</h2>
                  <div className="pt-3">
                    <input
                      type="text"
                      className="form-control form_login"
                      placeholder="Email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="py-3 input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form_login_pass"
                      placeholder="Password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                      }}
                    />
                    <span
                      className="input-group-text eye "
                      onClick={() => {
                        showPassword ? setShowPassword(false) : setShowPassword(true);
                      }}
                    >
                      {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn_login btn w-100">
                      Login
                    </button>
                  </div>

                  <p className="pt-3">
                    Dont'have an account?
                    <a href="/register" className="link_ask_account ms-1">
                      Register here
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

export default Login;
