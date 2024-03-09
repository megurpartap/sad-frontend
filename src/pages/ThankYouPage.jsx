import React from "react";

const ThankYouPage = () => {
  return (
    <div className="sm:py-4 w-full registerbg flex justify-center">
      <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
      <div className="w-full h-full flex justify-center items-center z-20">
        <div className="w-1/2 h-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-green-600">
            Thank You
          </h1>
          <p className="text-center font-bold">
            Your application has been submitted successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
