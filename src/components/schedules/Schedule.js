import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch,} from 'react-redux';
import uuid from 'react-uuid';
import { addSchedule } from '../../redux/feature/scehdule/action';
import ScheduleList from './ScheduleList';
import { calculatePeriod } from '../../common/calcDate';




const Schedule = () => {
  const dispatch = useDispatch();
  

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [period, setPeriod] = useState('');
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  
  

  useEffect(() => {
    setPeriod(calculatePeriod(endDate, startDate));
    console.log(endDate);
    console.log(startDate);
  }, [startDate, endDate])
  
  const add = () => {
    const newSchdule = {
      id : uuid(),
      title,
      start_date : startDate,
      end_date : endDate,
    }
    console.log(newSchdule);
    dispatch(addSchedule(newSchdule));
    setTitle("");
    setStartDate(new Date());
    setEndDate(new Date());
  }
  return (
    <div className='border min-h-[6rem] shadow-md p-3 flex flex-col gap-2 w-full text-xs
    md:text-sm
    '>
      <div className=' h-16 text-xl flex items-center tracking-wider lg:h-20 lg:text-2xl'>
      <div className='p-2'>
        <div className='font-bold  text-gray-400'>SCHEDULE</div>
      </div>
    </div>
      <div className='bg-slate-200 flex justify-end'>
      <button 
        className='bg-slate-600 w-10 p-1 text-xl text-white font-bold'
        onClick={() => setEdit(!edit)}
        >+</button>
      </div>
      {edit ? 
      <div className='flex gap-3 border p-2 justify-center items-center'>
        <div className=' grow flex items-center p-1'>
          <input 
            type='text' 
            className='w-full p-2 outline-none border'
            placeholder='진행 할 스케줄 입력'
            value={title} onChange={(e) =>setTitle(e.target.value)} />
        </div>

      <div className='flex flex-col gap-2'>
        <div className='xl:flex mx-1 gap-1'>
      <label>시작일 </label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
        dateFormat="yyyy/MM/dd"
        className='border w-24 text-center text-xs'
      />
      </div>
      <div className='xl:flex mx-1 gap-1 '>
      <lable>종료일</lable>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy/MM/dd"
        className='border w-24 text-center text-xs'
      />
      </div>
      </div>
      <div className='border w-28  text-center flex flex-col justify-center gap-1 text-xs'>
          <p className='bg-slate-600 text-white'>진행기간</p>
          <span className='py-1'>{period ==="1일" ? "하루" : period }</span>
        </div>
      <button className='bg-slate-700 w-12 h-12 text-white text-center flex items-center justify-center'
        onClick={add}
      >등록</button>

      </div>
          : ""}
      <div className='border p-2 gap-3 flex flex-col'>
        <ScheduleList/>
    
      </div>
    </div>
  
  )
}

export default Schedule