import MemberRegisterForm from "@/components/Forms/MemberRegisterForm";
import React from "react";

const RegistrationFormPage = () => {
  return (
    <div className="w-full registerbg flex justify-center">
      <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
      <MemberRegisterForm />
    </div>
  );
};

export default RegistrationFormPage;
