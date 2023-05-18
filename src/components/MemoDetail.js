import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMemo, modifyMemo, removeMemo } from '../redux/feature/memoSlice';
import Parser from 'html-react-parser';
import { format } from 'date-fns';
import RenderEditor from './RenderEditor';
import { BsArrowReturnLeft } from "react-icons/bs";


const MemoDetail = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const memoList = useSelector((state) => state.memo.memoList);
  const memo = memoList.filter((memo) => memo.id === param.id)[0];
  const [isModify, setIsModify] = useState(false);

  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const inputRef= useRef();

  useEffect(() => {
    if(isModify){
      inputRef.current.focus();
    }
  }, [isModify])
  
  

  const saveMemo = () => {
    const updateMemo = {
      id: param.id,
      title,
      content,
    };

    dispatch(modifyMemo(updateMemo));
    setIsModify(false);
  };
  const removeCurrentMemo = () => {
    dispatch(removeMemo(param.id));
    navigate("/memo");
  };

  return (
    <div className='p-2'>
      <div className='p-3 border-b flex justify-between items-center h-16'>
        {isModify ? (
          <input
            type='text'
            className='outline-none w-full border-b p-2 focus:border-slate-700'
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <>
            <span className='font-bold text-xl'>{memo.title}</span>
            <span className=''>
              {format(new Date(memo.date), "yyyy-MM-dd HH시 mm분")}
            </span>
          </>
        )}
      </div>
      <div className='p-3 border min-h-[400px]'>
        {isModify ? (
          <RenderEditor content={content} setContent={setContent} />
        ) : (
          Parser(content)
        )}
      </div>
      <div className='p-3 h-16 flex justify-between items-center'>
        <div className='flex gap-3'>
          <button
            className='p-2 bg-slate-400 text-white'
            onClick={() => setIsModify(!isModify)}
          >
            수정
          </button>
          <button
            className='p-2 bg-slate-400 text-white'
            onClick={removeCurrentMemo}
          >
            삭제
          </button>
        </div>

        <div className='flex items-center gap-3'>
          <Link to='/memo'>
            <button className='p-3 bg-slate-600'>
              <BsArrowReturnLeft className='text-white font-bold text-lg' />
            </button>
          </Link>
          {isModify ? (
            <button className='p-2 bg-slate-400 text-white' onClick={saveMemo}>
              저장
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoDetail