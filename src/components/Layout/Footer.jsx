import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { BiMenu } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className=" bg-sadOrange relative z-40 flex flex-col py-3 gap-2 items-center justify-center mt-auto">
      <div className=" flex px-4 gap-3">
        <AiOutlineTwitter className="h-6 w-6" color="white" />
        <ImWhatsapp className="h-6 w-6" color="white" />
        <FaFacebookF className="h-6 w-6" color="white" />
      </div>
      <div className=" px-4  text-white ">
        <p className="text-center">
          © {new Date().getFullYear()} Shiromani Akali Dal (Amritsar)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
