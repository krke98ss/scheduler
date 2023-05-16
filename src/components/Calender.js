import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  endOfWeek,
  isSameDay,
  getDay,
  subMonths,
  addMonths,
  getMonth,
} from "date-fns";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import React, { useEffect, useState } from "react";

const RenderHeader = ({currentMonth,prevMonth, nextMonth}) => {
  const months = ["January","February", "March", "April", "May", "June", "July" ,"August", "September", "October", "November", "December"];
  const monthString = months[getMonth(currentMonth)];
  return (
  <div className='w-full border-b-2 border-red-400 h-20 flex items-center justify-between'>
    <div>
    <span className='text-3xl ml-3 font-bold text-orange-800'>{format(currentMonth, "M")} <span className='text-base font-normal'>({monthString})</span></span>
    <span className='text-lg ml-3'>{format(currentMonth, "yyyy")}</span>
    </div>
    <div className='flex gap-2 mr-5'>
      <button className='p-2 border' onClick={() =>prevMonth()}><FiChevronLeft/></button>
      <button className='p-2 border' onClick={() =>nextMonth()}><FiChevronRight/></button> 
    </div>
  </div>
    );
};

const RenderDays = ({ currentMonth, selectedDate }) => {
  console.log(typeof getDay(currentMonth));
  const days = [];
  const dates = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];
  dates.forEach((date, i) => {
    days.push(
      <div
        className={`${
          getDay(selectedDate) === i ? "border-red-300" : ""
        } border-b-4 w-16 p-2 flex-grow font-medium tracking-wider`}
      >
        {date}
      </div>
    );
  });

  return <div className='flex gap-1'>{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const month = format(currentMonth, "M");
  const rows = [];
  let days = [];
  let day = startDate;
  let formmatedDate = "";

  console.log(formmatedDate);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formmatedDate = format(day, "d");
      const cloneday = day;
        days.push(
          <div
            className={`
            ${isSameDay(day, selectedDate) ? "border-violet-400 font-bold" : ""}
            ${i === 0 ? "bg-red-100" : ""}
              border p-2 w-16 h-24 hover:bg-slate-200 flex-grow`}
            key={day}
            onClick={() => onDateClick(cloneday)}
          >
          {format(day, "M") === month ? formmatedDate : ""}
          </div>
        );

      day = addDays(day, 1);
    }
    rows.push(<div className='flex'>{days}</div>);
    days = [];
  }

  return <div className='cursor-pointer'>{rows}</div>;
};

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClick = (day) => {
    setSelectedDate(day);
    console.log(selectedDate);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }
  return (
    <div className='flex flex-col w-[868px] gap-2 shadow-md'>
      <RenderHeader 
        currentMonth={currentMonth}
        prevMonth={prevMonth} 
        nextMonth={nextMonth}
      />
      <RenderDays 
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default Calender;
