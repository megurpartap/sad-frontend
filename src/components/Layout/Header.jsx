import { BiMenu } from "react-icons/bi";
import { AiFillCloseCircle, AiOutlineTwitter } from "react-icons/ai";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { ImWhatsapp } from "react-icons/im";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" bg-sadOrange relative z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/sad-logo.png"
            alt="Logo"
            className="h-16 w-16 p-3     bg-yellow-600 rounded-full"
          />
          <h1 className="hidden sm:block text-white text-xl font-semibold ml-2">
            Shiromani Akali Dal (Amritsar)
          </h1>
          <h1 className="sm:hidden text-white text-xl font-semibold ml-2">
            S.A.D Amritsar
          </h1>
        </div>
        <div className="hidden sm:flex space-x-4">
          <Link to="/" className="text-white ">
            Home
          </Link>
          <Link to="/register" className="text-white ">
            ID Card Registration Form
          </Link>
        </div>
        <div className=" px-4 gap-3 hidden sm:flex">
          <AiOutlineTwitter className="h-6 w-6" color="white" />
          <ImWhatsapp className="h-6 w-6" color="white" />
          <FaFacebookF className="h-6 w-6" color="white" />
        </div>
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <AiFillCloseCircle className="h-8 w-8" />
            ) : (
              <BiMenu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition duration-300 linear"
        enterFrom="opacity-0 "
        enterTo="opacity-100 "
        leave="transition duration-300 linear"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <div className="sm:hidden bg-sadOrange ">
          <a href="#" className="block py-2 px-4 text-white  ">
            Home
          </a>
          <a href="#" className="block py-2 px-4 text-white ">
            ID Card Registration Form
          </a>
          <a href="#" className="block py-2 px-4 text-white ">
            Menu Item 3
          </a>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
