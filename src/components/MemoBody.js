import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeMemo, setSort } from '../redux/feature/memoSlice';
import { format } from 'date-fns';
import { Link, useOutletContext } from 'react-router-dom';
import { TiTimesOutline } from "react-icons/ti";
import { GoPencil } from "react-icons/go";



const MemoBody = () => {
  const {isWrite, setIsWrite} = useOutletContext();
  const dispatch =useDispatch()
  const sort = useSelector((state) => state.memo.sort);
  
  useEffect(() => {
    
  }, [])
  
  
  return (
    <>
      <div className='border min-h-[4rem] flex justify-end'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-2'>
            <label for='list'>목록</label>
            <input
              id='list'
              type='radio'
              name='sort'
              value='list'
              checked={sort === 'list'}
              onChange={(e) => dispatch(setSort(e.target.value))}
            />
          </div>
          <div className='flex gap-2'>
            <label for='image'>이미지</label>
            <input
              id='image'
              type='radio'
              name='sort'
              value='image'
              checked={sort === 'image'}
              onChange={(e) => dispatch(setSort(e.target.value))}
            />
          </div>
        </div>
        <div className='flex items-center p-2'>
          <button
            className='p-2 text-white bg-slate-600 flex gap-3 items-center'
            onClick={() => setIsWrite(!isWrite)}
          >
            <span>글 작성</span>
            <GoPencil className='' />
          </button>
        </div>
      </div>
      <MemoList />
    </>
  );
}


const MemoList = () => {
  const sort = useSelector((state) => state.memo.sort);
  const memoList = useSelector((state) => state.memo.memoList);
  let render = memoList.map((memo) => <MemoItem memo={memo}/>);
  
  if(render.length === 0){
    return <div className='p-4 h-48'>
      <p className='text-lg text-gray-400'>현재 작성된 메모가 없습니다.</p>
      </div>
  }

  if(sort === "image"){
    return <div className='grid gap-3 grid-cols-4 p-4 max-lg:grid-cols-3'>{render}</div>
  }else {
    return <div className='p-2 min-h-[12rem] flex flex-col justify-center gap-1'>{render}</div>
  }
  
}

const MemoItem = ({memo}) => {
  const sort = useSelector((state) => state.memo.sort);
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();

  const removeCurrentMemo = (e) => {
    e.preventDefault();
    dispatch(removeMemo(memo.id));
  }
    return (
      <Link to={`${memo.id}`}>
        {sort === "list"
        ? 
        <div className='p-3 flex justify-between items-center border hover:bg-slate-100 bg-yellow-100'>
          <div className='font-bold'>
            {memo.title}
          </div>
          <div className='flex gap-5'>
          <div className=''> {format(new Date(memo.date), "yyyy/MM/dd")}</div>
          <button onClick={removeCurrentMemo}>
                  <TiTimesOutline className='text-2xl' />
                </button>
                </div>
        </div>
        : 
        <div
          className='border-2 bg-yellow-200 w-48 h-48 shadow-md flex'
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
        >
          {over ? (
            <div className='relative p-2 items-center w-full h-10'>
              <div className='flex justify-between'>
                <span className=' px-2 py-1 border-2 border-slate-400 rounded-lg font-bold'>
                  {format(new Date(memo.date), "yyyy/MM/dd")}
                </span>
                <button onClick={removeCurrentMemo}>
                  <TiTimesOutline className='text-2xl' />
                </button>
              </div>
              <div className='p-2 font-bold'>{memo.title}</div>
            </div>
          ) : (
            ""
          )}
        </div>
        }
        
      </Link>
    );
  }

export default MemoBody