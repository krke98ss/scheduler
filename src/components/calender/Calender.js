import {subMonths, addMonths } from "date-fns";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Cells from "./Cells";
import Modal from "./Modal";
import Days from "./Days";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../redux/feature/todoSlice';

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState({
    day: null,
    open: false,
  });
  
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.info).id;
  useEffect(() => {
    dispatch(fetchTodos(userId));
  }, [])
  

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const onDateDoubleClick = (day) => {
    setModal({ day, open: true });
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  return (
    <div className='flex flex-col w-[900px] gap-2 shadow-lg p-3 relative'>
      <Header
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <Days selectedDate={selectedDate} />
      <Cells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        onDateDoubleClick={onDateDoubleClick}
      />
      {modal.open ? <Modal modal={modal} setModal={setModal} /> : ""}
    </div>
  );
};

export default Calender;
