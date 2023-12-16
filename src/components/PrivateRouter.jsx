import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function PrivateRouter() {
  const [globalState  ] = useContext(GlobalContext);

  return <div className="container">{globalState.isLogin ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default PrivateRouter;
