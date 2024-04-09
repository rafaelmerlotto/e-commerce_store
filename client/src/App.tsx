import React from "react";
import Overview from "./pages/Overview";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import { useAuth } from "./auth/auth";
import Login from "./pages/Login";


export default function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}




interface Props {
  children: any
}

const PrivateRoute: any = ({ children }: Props) => {
  let auth = useAuth()
  if (!auth.token ) {
    return (
      <Navigate to={"/login"} replace />
    )
  
  }
  return children
}