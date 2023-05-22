import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/feature/memoSlice';
import {useOutletContext } from 'react-router-dom';
import { GoPencil } from "react-icons/go";
import MemoList from './MemoList';



const MemoBody = () => {
  const {isWrite, setIsWrite} = useOutletContext();
  const dispatch =useDispatch()
  const sort = useSelector((state) => state.memo.sort);
  
  return (
    <>
      <div className='border min-h-[4rem] flex justify-end p-2 gap-4 items-center'>
        <div className='flex items-center  rounded-lg px-2  text-gray-500 text-sm h-9'>
          <div className='flex gap-2 border-r-2 px-3'>
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
          <div className='flex gap-2 px-3'>
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
            <span className='text-sm'>글 작성</span>
            <GoPencil className='' />
          </button>
        </div>
      </div>
      <MemoList />
    </>
  );
}






export default MemoBody