import React, { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import HeaderDropDown from "./HeaderDropDown";

function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
  };

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        <div className="flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className=" md:text-4xl  hidden md:inline-block font-bold  font-sans">
            Projects
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              board
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 "
              onClick={onDropdownClick}
            />
          </div>
        </div>
        {/* The right side */}
        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button className="button hidden md:block" onClick={() => {}}>
            + Add New Task
          </button>
          <button onClick={() => {}} className="button py-1 px-3 md:hidden ">
            +
          </button>

          <img
            onClick={() => {}}
            src={""}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
        </div>
      </header>
      {openDropdown && <HeaderDropDown setOpenDropdown={setOpenDropdown} />}
    </div>
  );
}

export default Header;
