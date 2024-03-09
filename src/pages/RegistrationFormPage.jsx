import MemberRegisterForm from "@/components/Forms/MemberRegisterForm";
import React from "react";

const RegistrationFormPage = () => {
  return (
    <div className="sm:py-4 w-full flex-grow registerbg flex justify-center">
      <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
      <MemberRegisterForm redirectUrl="thankyou" />
    </div>
  );
};

export default RegistrationFormPage;
