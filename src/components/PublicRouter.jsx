import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
  return <div>{!localStorage.token ? <Outlet /> : <Navigate to="/" />}</div>;
}
