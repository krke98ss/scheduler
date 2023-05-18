import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addMemo, removeMemo } from '../redux/feature/memoSlice';
import uuid from 'react-uuid';
import RenderEditor from './RenderEditor';
import { Link, Outlet} from 'react-router-dom';
import { GoPencil } from "react-icons/go";
import { BsArrowReturnLeft } from "react-icons/bs";

const RenderHeader = () => {
  let render;

  return <div>{render}</div>;
};

const Memo = () => {
  const [isWrite, setIsWrite] = useState(false);
  
  return (
    <div className='border  w-[812px] shadow-md '>
      {/* header */}
      <div className='border  h-20 flex items-center'>
        <div className='p-2'>
          <div className='font-bold text-2xl text-gray-400'>Memo</div>
        </div>
      </div>

      {isWrite ? <RenderWrite setIsWrite={setIsWrite}/> : <Outlet context={{isWrite, setIsWrite}}/>}

      {/* footer */}
      <div className='h-20 border  w-full flex item-center'>
      
      </div>
    </div>
  );
};

export default Memo;

const RenderWrite = ({setIsWrite}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  

  const doMemo = () => {
    if(!title) {
      return;
    }

    const newMemo = {
      id : uuid(),
      title,
      content,
      date : new Date()
    }
    
    dispatch(addMemo(newMemo));
    setIsWrite(false);
  }

  return (
    <div className='p-2 flex flex-col gap-2'>
      <div className='header h-16 border  flex  items-center p-2'>
        <input
          type='text'
          className='p-2 outline-none w-full'
          placeholder='제목을 입력해주세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className='body border '>
        <RenderEditor setContent={setContent}/>

      </div>
      <div className='footer h-14 border flex justify-between p-2'>
        <div></div>
        <div className='flex gap-3'>
          
          <button className='px-3 py-1 bg-slate-600' onClick={()=>setIsWrite(false)}>
          <BsArrowReturnLeft className='text-white font-bold text-lg'/>
          </button>
          
          <button
            className='p-2 text-white bg-slate-600 flex gap-2  items-center'
            onClick={doMemo}
          > <GoPencil className=''/>
            <span>Memo!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
