import { useDispatch, useSelector } from 'react-redux';
import MemoItem from './MemoItem';
import { useEffect } from 'react';
import { fetchMemos } from '../../redux/feature/memoSlice';

const MemoList = () => {
  const sort = useSelector((state) => state.memo.sort);
  const memoList = useSelector((state) => state.memo.memoList);
  const userId = useSelector((state) => state.user.info).id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemos(userId));
  }, [])
  
  
  let render = memoList.map((memo, index) => <MemoItem memo={memo} index={index} key={index}/>);
  
  if(render.length === 0){
    return <div className='p-4 h-48'>
      <p className='text-lg text-gray-400'>현재 작성된 메모가 없습니다.</p>
      </div>
  }

  if(sort === "image"){
    return <div className='grid gap-3 grid-cols-4 p-4 max-lg:grid-cols-3'>{render}</div>
  }else {
    return <div className='p-2 min-h-[12rem] flex flex-col  gap-1'>{render}</div>
  }
  
}

export default MemoList;