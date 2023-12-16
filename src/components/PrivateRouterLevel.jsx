import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function PrivateRoute() {
  const [globalState] = useContext(GlobalContext);
  return <div>{globalState.dataUser.level === "owner" ? <Outlet /> : <Navigate to="/" />}</div>;
}
