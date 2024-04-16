import React from "react";
import Overview from "./pages/Overview";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import { useAuth } from "./auth/auth";
import Login from "./pages/Login";
import TheBag from "./pages/TheBag";
import FormNotRegistred from "./pages/FormNotRegistred";
import FormRegistred from "./pages/FormRegistred";
import Register from "./pages/Register";
import Account from "./pages/Account";


export default function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<TheBag />} />
          <Route path="/info" element={<FormNotRegistred />} />
          <Route path="/user/info" element={<PrivateRoute><FormRegistred /> </PrivateRoute>} />
          <Route path="/user/account" element={<PrivateRoute><Account /> </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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