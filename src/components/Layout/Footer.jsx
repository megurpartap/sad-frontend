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
        <a href="https://twitter.com/share?url=https%3A%2F%2Fsadamritsar.com%2F&text=Join%20Shiromani%20Akali%20Dal%20(Amritsar)%20for%20a%20better%20punjab.">
          <AiOutlineTwitter className="h-6 w-6" color="white" />
        </a>
        <a href="whatsapp://send?text=https%3A%2F%2Fsadamritsar.com%2F%20Join%20Shiromani%20Akali%20Dal%20(Amritsar)%20for%20a%20better%20punjab.s">
          <ImWhatsapp className="h-6 w-6" color="white" />
        </a>
        <a href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsadamritsar.com%2F">
          <FaFacebookF className="h-6 w-6" color="white" />
        </a>
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
