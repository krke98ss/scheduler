import { format } from "date-fns";
import React from "react";
import { useState } from 'react';
import { TiTimesOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeSchedule } from '../../redux/feature/scehdule/action';
import { calculatePeriod } from '../../common/calcDate';

const ScheduleItem = ({ schedule }) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeSchedule(schedule.id));
  };

  const period = calculatePeriod(new Date(schedule.end_date), new Date());



  return (
    <div className='border flex px-3 p-2 items-center gap-2 bg-slate-900 text-white opacity-50 hover:opacity-70 justify-between'>
      <span> {schedule.title}</span>
      <div className='flex items-center gap-10'>
      <div className='border p-1 text-xs'>
        <div>{format(new Date(schedule.start_date), "yy-MM-dd")}</div>
        <div>{format(new Date(schedule.end_date), "yy-MM-dd")}</div>
      </div>
      <span>{period}</span>
      <button onClick={removeItem}>
        <TiTimesOutline className='text-xl' />
      </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
