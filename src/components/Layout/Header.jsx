import React, { useState } from "react";
import { Transition } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" bg-orange-400 relative z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/sad-logo.png"
            alt="Logo"
            className="h-16 w-16     bg-yellow-600 rounded-full"
          />
          <h1 className="text-white text-xl font-semibold ml-2">
            Shiromani Akali Dal (Amritsar)
          </h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            Menu Item 1
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Menu Item 2
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Menu Item 3
          </a>
        </div>
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {/* {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )} */}
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:hidden bg-gray-700">
          <a href="#" className="block py-2 px-4 text-white hover:bg-gray-600">
            Menu Item 1
          </a>
          <a href="#" className="block py-2 px-4 text-white hover:bg-gray-600">
            Menu Item 2
          </a>
          <a href="#" className="block py-2 px-4 text-white hover:bg-gray-600">
            Menu Item 3
          </a>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
