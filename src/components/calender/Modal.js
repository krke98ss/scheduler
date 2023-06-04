import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  allCheck,
  clean,
} from "../../redux/feature/todoSlice";
import { addDays, format } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import TodoList from "./TodoList";
import uuid from 'react-uuid';

import "react-datepicker/dist/react-datepicker.css";
import TimePicker from './TimePicker';
import ColorRadio from './ColorRadio';
import { BiLockAlt } from "react-icons/bi";




const Modal = ({ modal, setModal }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");
  const [todoTime, setTodoTime] = useState("");
  const [tagColor, setTagColor] = useState("");

  const todoList = useSelector((state) => state.todo.todoList);
  const userId = useSelector((state) => state.user.info).id;
  const inputRef = useRef();

  const [select, setselect] = useState();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const closeModal = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }

    setModal({ day: null, open: false });
  };

  const appendTodo = () => {
    if (!todoValue) {
      return;
    }


    const newTodo = {
      id: uuid(),
      date: modal.day,
      content: todoValue,
      time : todoTime,
      tag_color : tagColor,
      success: false,
      userId
    };

    console.log(newTodo);

    dispatch(addTodo(newTodo));  
    setTodoValue("");
    setTodoTime("");
    setTagColor("");
    
  };

  

  return (
    <div
      className='w-full h-full absolute flex justify-center items-center '
      onClick={closeModal}
    >
      <div
        className='w-72 text-xs bg-white border shadow-md p-3 border-slate-400 flex flex-col gap-2 z-[1200]
        lg:text-sm lg:w-96
        '
        
        ref={modalRef}
      >
        <div className='border-b-2 flex py-2 px-3  items-center justify-between bg-indigo-400 text-white'>
          <div className='flex items-center'>
            <button
              onClick={() =>
                setModal({ ...modal, day: addDays(modal.day, -1) })
              }
            >
              <FiChevronLeft className='' />
            </button>
            <span className=' px-3 py-[6px]  rounded-lg font-bold'>
              {format(modal.day, "yyyy-MM-dd")}
            </span>
            <button
              onClick={() => setModal({ ...modal, day: addDays(modal.day, 1) })}
            >
              <FiChevronRight className='' />
            </button>
          </div>
          <button onClick={() => setModal({ day: null, open: false })}>
          <AiOutlineClose className='text-lg'/>
          </button>
        </div>
        <div>
          <div className='p-2 flex flex-col gap-3'>
            <TodoList day={modal.day} />
          </div>

          <div className='flex flex-col gap-3'>
            <div className='relative flex justify-center items-center border'>
              <input
                type='text'
                className='outline-none  focus:border-violet-400 grow p-2'
                ref={inputRef}
                value={todoValue}
                placeholder='일정을 입력해주세요.'
                onChange={(e) => setTodoValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.code === "Enter") appendTodo();
                }}
              />
              <TimePicker time={todoTime} setTime={setTodoTime}/>
              <button
                className='bg-slate-500 py-1 px-3 text-white font-bold text-lg'
                onClick={appendTodo}
              >
                +
              </button>
            </div>
            <div className='h-5 flex  items-center gap-3'>
              <ColorRadio setColor={setTagColor} color={tagColor} tagColor='red' />
              <ColorRadio setColor={setTagColor} color={tagColor} tagColor='yellow'/>
              <ColorRadio setColor={setTagColor} color={tagColor} tagColor='green'/>
              <ColorRadio setColor={setTagColor} color={tagColor} tagColor='indigo'/>
              <ColorRadio setColor={setTagColor} color={tagColor} tagColor='violet'/>
              
            </div>

            <div className='flex justify-center items-center py-2 border-slate-400 '>
              <button
                className='py-1 grow px-2 border text-gray-400  hover:bg-slate-500 hover:text-white'
                onClick={() => dispatch(clean({ userId, date: modal.day }))}
              >
                Clean
              </button>
              <button
                className='py-1 grow px-2 border text-gray-400  hover:bg-slate-500 hover:text-white'
                onClick={() =>
                  dispatch(allCheck({ userId, date: modal.day, success: true }))
                }
              >
                All Check
              </button>
              <button
                className='py-1 grow px-2 border text-gray-400  hover:bg-slate-500 hover:text-white'
                onClick={() =>
                  dispatch(
                    allCheck({ userId, date: modal.day, success: false })
                  )
                }
              >
                All Decheck
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Modal;
