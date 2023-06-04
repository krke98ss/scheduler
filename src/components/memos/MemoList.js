import { useDispatch, useSelector } from 'react-redux';
import MemoItem from './MemoItem';
import { useEffect } from 'react';
import { fetchMemos } from '../../redux/feature/memoSlice';

const MemoList = () => {
  const sort = useSelector((state) => state.memo.sort);
  const memoList = useSelector((state) => state.memo.memoList);
  const userId = useSelector((state) => state.user.info);
  console.log(userId);
  const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(fetchMemos(userId));
  }, []) */
  
  
  let render = memoList.map((memo, index) => <MemoItem memo={memo} index={index} key={index}/>);
  
  if(render.length === 0){
    return <div className='p-4 h-48'>
      <p className='text-lg text-gray-400'>현재 작성된 메모가 없습니다.</p>
      </div>
  }

  if(sort === "list"){
    return <div className='p-2 min-h-[12rem] flex flex-col gap-1'>{render}</div>
  }else {
    return <div className='grid gap-2 p-3 w-full mx-auto
    grid-cols-3 
    md:grid-cols-3 
    lg:grid-cols-4
    2xl:grid-cols-5
    '>{render}</div>
  }
  
}

export default MemoList;