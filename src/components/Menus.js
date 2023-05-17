import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { allClean } from '../redux/feature/todoSlice';

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
            데이터 일괄 삭제
          </button>
          
        </div>
    </div>
  );
};

export default Menus;
