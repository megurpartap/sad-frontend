import ApplicationForm from "@/components/Forms/ApplicationLoginForm";

import React from "react";

const ApplicationFormPage = () => {
  return (
    <div className="sm:py-4 w-full registerbg flex justify-center">
      <div className="w-full h-full bg-white fixed top-0 left-0 opacity-70 z-10"></div>
      <ApplicationForm />
    </div>
  );
};

export default ApplicationFormPage;
