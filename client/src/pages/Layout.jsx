// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout ()  {

  return (
    <>
      <div className="min-vh-100 " style={{ backgroundColor: "#DBEAFE" }}>
        <Outlet />
         </div>
      <Footer/>
    </>
  );
};

export default Layout;
