import ApplicationForm from "@/components/Forms/ApplicationLoginForm";
import { Button } from "@/components/ui/button";

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="sm:py-4 w-full registerbg flex justify-center">
      <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
      <div className="sm:w-[700px] sm:my-3 sm:border-[1px] border-gray-400 bg-white w-full sm:rounded-lg sm:shadow p-4 relative z-10">
        <div className="formHeader  flex flex-col items-center sm:flex-row sm:justify-around border-b-2 border-gray-100 pb-6 ">
          <div className=" sm:w-2/12 w-1/3 flex items-center justify-center">
            <img src="/sad-logo.png" alt="" className="w-full" />
          </div>
          <div className=" sm:w-9/12 flex items-center justify-center">
            <h1 className="text-2xl sm:text-5xl text-center font-bold">
              Shiromani Akali Dal Amritsar Login Form
            </h1>
          </div>
        </div>
        <div className="py-6 flex flex-col items-center justify-center">
          <h1 className=" font-medium text-2xl">Select Registeration Type</h1>
          <Link to="/register">
            <Button className=" bg-blue-950 mt-4 text-lg p-9 min-w-64 hover:bg-pink-700">
              ID Card Registeration
            </Button>
          </Link>
          <Link to="/login">
            <Button className=" bg-blue-950 mt-4 text-lg p-9 min-w-64 hover:bg-pink-700">
              Application Form
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
