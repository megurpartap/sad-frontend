import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <>
      <div className=" min-h-screen flex flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <Toaster />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
