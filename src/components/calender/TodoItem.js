import { useDispatch } from 'react-redux';
import { modifyTodo, removeTodo } from '../../redux/feature/todoSlice';
import { useState } from 'react';
import { BsCheckSquare} from "react-icons/bs";
import { TiTimesOutline } from 'react-icons/ti';

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
          : "border-green-600 hover:bg-slate-100"
      } flex justify-between p-4  border-x-4  bg-yellow-50 h-14`}
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
                className='text-green-700 font-bold text-xl'
                onClick={() =>
                  dispatch(modifyTodo({ id: todo.id, success: false }))
                }
              />
            ) : (
              <button
                className='w-5 h-5 border-2 rounded border-green-600'
                onClick={() =>
                  dispatch(modifyTodo({ id: todo.id, success: true }))
                }
              ></button>
            )}
            <div className={`${todo.success ? "line-through" : ""} text-sm`}>
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

export default TodoItem;