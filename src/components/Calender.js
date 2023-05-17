import {
  format,
  parseISO,
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
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCheck, allDecheck, clean, insertTodo, modifyTodo, removeTodo } from "../redux/feature/todoSlice";
import { TiTimesOutline } from "react-icons/ti";
import { ImPencil } from "react-icons/im";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthString = months[getMonth(currentMonth)];
  return (
    <div className='w-full border-b  h-20 flex items-center justify-between'>
      <div>
        <span className='text-3xl ml-5 font-bold text-orange-800'>
          {format(currentMonth, "M")}{" "}
          <span className='text-base font-normal'>({monthString})</span>
        </span>
      
      </div>
      <div className='flex gap-10'>
      <span className='text-2xl ml-3 font-bold text-gray-500'>{format(currentMonth, "yyyy")}</span>
      <div className='flex gap-2 mr-5'>
        <button className='p-2 border' onClick={() => prevMonth()}>
          <FiChevronLeft />
        </button>
        <button className='p-2 border' onClick={() => nextMonth()}>
          <FiChevronRight />
        </button>
      </div>
      </div>
    </div>
  );
};

const RenderDays = ({ currentMonth, selectedDate }) => {
  const days = [];
  const dates = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];
  dates.forEach((date, i) => {
    days.push(
      <div
        className={`
        ${getDay(selectedDate) === i ? "border-red-300" : ""}
        ${i === 0 ? "text-red-600" : ""}
          border-b-4 w-16 p-2 flex-grow font-medium tracking-wider`}
        key={i}
      >
        {date}
      </div>
    );
  });

  return <div className='flex gap-1'>{days}</div>;
};

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  onDateDoubleClick,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const todoList = useSelector((state) => state.todo.todoList);

  const month = format(currentMonth, "M");
  const rows = [];
  let days = [];
  let day = startDate;
  let formmatedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formmatedDate = format(day, "d");
      const cloneday = day;

      days.push(
        <div
          className={`
            ${
              isSameDay(day, selectedDate)
                ? "border-violet-300  border-4 font-bold"
                : ""
            }
            ${i === 0 ? "bg-red-100" : ""}
              border p-2 w-16 min-h-[8rem] hover:bg-slate-100 flex-grow shadow-md overflow-hidden`}
          key={day}
          onClick={() => onDateClick(cloneday)}
          onDoubleClick={() => onDateDoubleClick(cloneday)}
        >
          {format(day, "M") === month ? formmatedDate : ""}
          <div>
            <ul>
              {todoList.map((todo, index) => {
                if (isSameDay(new Date(todo.day), cloneday)) {
                  return (
                    <li
                      className={`${todo.success ?  "text-gray-300" : ""} text-xs font-normal text-ellipsis overflow-hidden whitespace-nowrap`}
                      key={index}
                    >
                      · {todo.content}
                    </li>
                  );
                }
                return;
              })}
            </ul>
          </div>
        </div>
      );

      day = addDays(day, 1);
    }
    rows.push(<div className='flex gap-[2px]'>{days}</div>);
    days = [];
  }

  return <div className='cursor-pointer flex flex-col gap-[2px]'>{rows}</div>;
};

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState({
    day: null,
    open: false,
  });

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
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays currentMonth={currentMonth} selectedDate={selectedDate} />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        onDateDoubleClick={onDateDoubleClick}
      />
      {modal.open ? <Modal modal={modal} setModal={setModal} /> : ""}
    </div>
  );
};

const Modal = ({ modal, setModal }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");
  const [insert, setInsert] = useState(true);
  
  const todoList = useSelector((state) => state.todo.todoList);
  const inputRef= useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const closeModal = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }

    setModal({ day: null, open: false });
  };

  const addTodo = () => {
    if (!todoValue) {
      return;
    }

    const newTodo = {
      id: new Date(),
      day: modal.day,
      content: todoValue,
      success: false,
    };

    dispatch(insertTodo(newTodo));

    setTodoValue("");
  };

  return (
    <div
      className='w-full h-full absolute flex justify-center items-center '
      onClick={closeModal}
    >
      <div
        className='w-96 bg-white border-2 shadow-md p-3 border-slate-400 flex flex-col gap-3'
        ref={modalRef}
        
      >
        <div className='border-b-2 flex justify-between p-2  justify-center items-center'>
          <button onClick={() => setModal({...modal, day : addDays(modal.day, -1)})}>
            <FiChevronLeft className='text-2xl'/>
          </button>
          <span className=' px-2 py-1 bg-violet-700 rounded-lg text-white font-bold'>
            {format(modal.day, "yyyy-MM-dd")}
            </span>
            <button onClick={() => setModal({...modal, day : addDays(modal.day, 1)})}>
              <FiChevronRight className='text-2xl'/>
            </button>
          
        </div>
        <div>
          <div className='p-2 flex flex-col gap-3'>
            <TodoList day={modal.day}/>
            {/* {todoList.map((todo) => {
              if (isSameDay(new Date(todo.day), modal.day)) {
                return <TodoItem todo={todo} />;
              }
              return;
            })}  */}
          </div>
          {insert ? (
            <div className='flex flex-col gap-3'>
              <div className='relative py-2 px-3 flex justify-center items-center gap-4'>
                <input
                  type='text'
                  className='outline-none border-2 focus:border-violet-400 grow p-1'
                  ref={inputRef}
                  value={todoValue}
                  placeholder='일정을 입력해주세요.'
                  onChange={(e) => setTodoValue(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.code === "Enter") addTodo();
                  }}
                />
                <ImPencil className='text-base absolute right-0 mr-6' />
            
              </div>
              <div className='flex justify-center items-center gap-4 border-t-2 '>
                
                <button 
                  className='py-1 px-2 border-x border-b border-slate-500 hover:bg-slate-500 hover:text-white'
                  onClick={() => dispatch(clean(modal.day))}
                >Clean</button>
                <button className='py-1 px-2 border-x border-b border-slate-500 hover:bg-slate-500 hover:text-white'
                  onClick={() => dispatch(allCheck(modal.day))}
                >All Check</button>
                <button className='py-1 px-2 border-x border-b border-slate-500 hover:bg-slate-500 hover:text-white'
                  onClick={() => dispatch(allDecheck(modal.day))}
                >All Decheck</button>
                
                
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const TodoList = ({ day }) => {
  const todoList = useSelector((state) => state.todo.todoList);

  let render = todoList.map((todo, index) => {
    if (isSameDay(new Date(todo.day), day)) {
      return <TodoItem todo={todo} key={index} />;
    }
    return;
  }).filter((data) => data !== undefined);

  if(render.length === 0){
    render = <span className='border-x-8 py-3  border-pink-300 text-center'>해당 일정이 없습니다.</span>
  }
  
  return <div className='p-2 flex flex-col gap-3'>{render}</div>;
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [itemValue, setItemValue] = useState(todo.content);

  const modify = () => {
    dispatch(modifyTodo({ id: todo.id, content: itemValue }));
    setIsModify(false);
  };
  return (
    <div
      className={`${
        todo.success
          ? "opacity-60 border-slate-600"
          : "border-green-700 hover:bg-slate-100"
      } flex justify-between p-4 border-b border-l-8 `}
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      onDoubleClick={() => setIsModify(true)}
    >
      <div className='flex gap-4 items-center'>
        {isModify ? (
          <input
            type='text'
            className='outline-none px-2 py-1 border'
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            onBlur={modify}
            onKeyUp={(e) => {
              if (e.code === "Enter") modify();
            }}
          />
        ) : (
          <>
            {todo.success ? (
              <BsCheckSquare
                className='text-green-700 font-bold text-2xl'
                onClick={() =>
                  dispatch(modifyTodo({ id: todo.id, success: false }))
                }
              />
            ) : (
              <button
                className='w-6 h-6 border-2 rounded border-green-600'
                onClick={() =>
                  dispatch(modifyTodo({ id: todo.id, success: true }))
                }
              ></button>
            )}
            <div className={`${todo.success ? "line-through" : ""}`}>
              {todo.content}
            </div>
          </>
        )}
      </div>
      <div className='flex items-center'>
        {isOver ? (
          <button onClick={() => dispatch(removeTodo(todo.id))}>
            <TiTimesOutline className='text-2xl' />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Calender;
