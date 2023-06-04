import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedules } from '../../redux/feature/scehdule/action';
import ScheduleItem from './ScheduleItem';

const ScheduleList = () => {
  const dispatch =useDispatch();
  const scheduleList = useSelector((state) => state.schedule.scheduleList);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, []);
  
  
  let render = scheduleList.map((schedule, index) => <ScheduleItem schedule={schedule} index={index} key={index}/>);
  
  

  if(render.length === 0){
    render = <p className='text-gray-400'>현재 진행중인 일정이 없습니다.</p>
  }

  return <div className='p-2  flex flex-col'>{render}</div>;
};

export default ScheduleList;
