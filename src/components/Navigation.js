import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { AiFillCalendar, AiFillEdit, AiFillHome } from "react-icons/ai";
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
    <div className='h-96 max-md:hidden'>
      <div className='relative w-40 h-full'>
        <div className='flex flex-col  absolute w-full items-star'>
          <NavItem link='/' icon={AiFillHome} content='HOME' />
          <NavItem link='/memo' icon={AiFillEdit} content='메모장' />
          <NavItem link='/calendar' icon={AiFillCalendar} content='캘린더' />
          <NavItem link='/schedule' icon={BiTimer} content='스케줄' />
          <NavItem link='/mypage' icon={BsPersonFill} content='내 정보' />
          <NavItem link={false} icon={FiUserX} content='로그아웃' func={logout} />
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
        className={`${over ? "w-28 text-black bg-white" : ""} w-14 text-sm bg-indigo-400 text-white px-3 py-4 overflow-hidden whitespace-nowrap text-over transition-all flex justify-center gap-3`}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={func}
      >
        {icon({ className: "text-xl" })}
        {over ? <span>{content}</span> : ""}
      </button>
    </Link>
  );
};

export default Navigation;
