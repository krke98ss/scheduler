import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  allCheck,
  allDecheck,
  clean,
} from "../../redux/feature/todoSlice";
import { addDays, format } from "date-fns";
import { ImPencil } from "react-icons/im";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TodoList from "./TodoList";
import uuid from 'react-uuid';

const Modal = ({ modal, setModal }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");

  const todoList = useSelector((state) => state.todo.todoList);
  const userId = useSelector((state) => state.user.info).id;
  const inputRef = useRef();

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
      success: false,
      userId
    };

    dispatch(addTodo(newTodo))
    setTodoValue("");
  };

  return (
    <div
      className='w-full h-full absolute flex justify-center items-center '
      onClick={closeModal}
    >
      <div
        className='w-96 bg-white border-2 shadow-md p-3 border-slate-400 flex flex-col gap-2'
        ref={modalRef}
      >
        <div className='border-b-2 flex justify-between p-3 pb-4 items-center'>
          <button
            onClick={() => setModal({ ...modal, day: addDays(modal.day, -1) })}
          >
            <FiChevronLeft className='text-2xl' />
          </button>
          <span className=' px-3 py-[6px] border-violet-700 border-2 rounded-lg text-gray-500 font-bold'>
            {format(modal.day, "yyyy-MM-dd")}
          </span>
          <button
            onClick={() => setModal({ ...modal, day: addDays(modal.day, 1) })}
          >
            <FiChevronRight className='text-2xl' />
          </button>
        </div>
        <div>
          <div className='p-2 flex flex-col gap-3'>
            <TodoList day={modal.day} />
          </div>

          <div className='flex flex-col gap-3'>
            <div className='relative py-2 px-3 flex justify-center items-center gap-4'>
              <input
                type='text'
                className='outline-none border-2 focus:border-violet-400 grow p-2 text-sm'
                ref={inputRef}
                value={todoValue}
                placeholder='일정을 입력해주세요.'
                onChange={(e) => setTodoValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.code === "Enter") appendTodo();
                }}
              />
              <ImPencil className='text-base absolute right-0 mr-6' />
            </div>
            <div className='flex justify-center items-center gap-3 p-2 border-slate-400 '>
              <button
                className='py-1 px-2 border rounded-md font-bold text-gray-400 border-slate-400 hover:bg-slate-500 hover:text-white'
                onClick={() => dispatch(clean({userId, date : modal.day}))}
              >
                Clean
              </button>
              <button
                className='py-1 px-2 border rounded-md font-bold text-gray-400 border-slate-400 hover:bg-slate-500 hover:text-white'
                onClick={() => dispatch(allCheck({userId, date : modal.day, success : true}))}
              >
                All Check
              </button>
              <button
                className='py-1 px-2 border rounded-md font-bold text-gray-400 border-slate-400 hover:bg-slate-500 hover:text-white'
                onClick={() => dispatch(allCheck({userId, date : modal.day, success : false}))}
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
