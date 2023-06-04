import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { AiFillCalendar, AiFillEdit, AiFillHome, AiOutlineSearch  } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { FiUserX } from "react-icons/fi";

import { persistor } from "../redux/store";

const Navigation = () => {
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    persistor.purge();
  };

  return (
    <div className=''>
      <div className='relative h-full flex gap-7 w-full lg:flex-col lg:w-28'>
        <div className='flex  items-star lg:flex-col '>
          <NavItem link='/' icon={AiFillCalendar} content='캘린더' />
          <NavItem link='/memo' icon={AiFillEdit} content='메모장' />
          
          <NavItem link='/schedule' icon={BiTimer} content='스케줄' />
          <NavItem link='/mypage' icon={BsPersonFill} content='내 정보' />
          <NavItem
            link={false}
            icon={FiUserX}
            content='로그아웃'
            func={logout}
          />
        </div>
      </div>
    </div>        
  );
};

const NavItem = ({ link, icon, content, func }) => {
  const [over, setOver] = useState(false);
  return (
    <Link to={link}>
      <button
        className={`
          text-xs p-2 border overflow-hidden whitespace-nowrap text-over transition-all flex justify-center gap-3 shadow-md text-white bg-indigo-400
        hover:text-black hover:bg-white
          md:px-3 md:py-4 md:text-sm md:w-12 md:hover:w-full
          `
          
        }
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={func}
      >
        {icon({ className: "text-base md:text-lg" })}
        {over ? <span className='hidden md:inline-block'>{content}</span> : ""}
      </button>
    </Link>
  );
};

export default Navigation;
