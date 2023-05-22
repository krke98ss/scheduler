import { format } from "date-fns";
import { TiTimesOutline } from "react-icons/ti";
import { removeMemo } from "../../redux/feature/memoSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const MemoItem = ({ memo, index }) => {
  const sort = useSelector((state) => state.memo.sort);
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();

  const removeCurrentMemo = (e) => {
    e.preventDefault();
    dispatch(removeMemo(memo.id));
  };

  return (
    <Link to={memo.id}>
      {sort === "list" ? (
        <div className='p-3 flex justify-between items-center border-2 border-violet-200 hover:bg-violet-50  text-gray-600'>
          <div className='font-bold'>
            {index + 1}. {memo.title}
          </div>
          <div className='flex gap-5'>
            <div className=''> {format(new Date(memo.date), "yyyy/MM/dd")}</div>
            <button onClick={removeCurrentMemo}>
              <TiTimesOutline className='text-2xl' />
            </button>
          </div>
        </div>
      ) : (
        <div
          className='border bg-yellow-100 w-48 h-48 shadow-md flex'
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
      )}
    </Link>
  );
};

export default MemoItem;
