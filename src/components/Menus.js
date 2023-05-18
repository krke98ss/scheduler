import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { allClean } from "../redux/feature/todoSlice";
import { Link } from "react-router-dom";

const Menus = () => {
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className='relative w-40'>
      <div className='flex flex-col gap-3 absolute w-full items-start'>
        <button
          className='bg-green-600 text-white p-3'
          onClick={() => dispatch(allClean())}
        >
          데이터 초기화
        </button>

        <Link to='/memo'>
          <button className='w-20 bg-green-600 text-white p-3 hover:w-48 transition-all'>
            Memo
          </button>
        </Link>

        <Link to='/calendar'>
          <button className='w-20 bg-green-600 text-white p-3 hover:w-48 transition-all'>
            Calendar
          </button>
        </Link>
        
        <Link to='/mypage'>
          <button className='w-20 bg-green-600 text-white p-3 hover:w-48 transition-all'>
            Mypage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menus;
