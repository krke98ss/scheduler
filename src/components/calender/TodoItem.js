import { useDispatch } from 'react-redux';
import { modifyTodo, removeTodo } from '../../redux/feature/todoSlice';
import { useRef, useState } from 'react';
import { BsCheckSquare} from "react-icons/bs";
import { TiTimesOutline } from 'react-icons/ti';
import color from '../../common/common';
import { format } from 'date-fns';
import TimePicker from './TimePicker';
import ColorRadio from './ColorRadio';


const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [success, setSuccess] = useState(false);


  const check = (e) => {
    setSuccess(!success);
    dispatch(modifyTodo({ id: todo.id, success }));
  }  
  return (
    <>
    {isModify 
    ? <ModifyMode todo={todo} setIsModify={setIsModify}/>
    : 
    <div
      className={`${
        todo.success
          ? "opacity-50"
          : `${color[todo.tag_color] || "border-slate-400"}  hover:bg-slate-100`
      } flex justify-between p-4  border-l-[5px]  h-14`}
      onMouseOver={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      onDoubleClick={() => setIsModify(true)}
      
    >
      <div className='flex justify-between grow'>
      <div className='flex gap-3 items-center relative'>
            {todo.success ? (
              <button onClick={check}>
              <BsCheckSquare
                className='text-white bg-slate-800 text-xl'
                
              />
              </button>
            ) : (
              <button
                className='w-4 h-4 border  border-slate-600'
                onClick={check}
              ></button>
            )}
            {todo.time 
            ?<span className='text-amber-600 px-2 border-x font-bold'>{format(new Date(todo.time),"aa h:mm ")}</span>
            : ""}
            
            <div className={`${todo.success ? "line-through" : ""}`}>
              {todo.content}
            </div>
      </div>
      </div>
      <div className='flex items-center '>
        
        {isOver ? (
          <button onClick={() => dispatch(removeTodo(todo.id))}>
            <TiTimesOutline className='text-xl' />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
} </>
    
  );
};

const ModifyMode = ({todo, setIsModify}) => {
  const dispatch = useDispatch();
  const [tagColor, setTagColor] = useState(todo.tag_color);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState(todo.time);
  const [itemValue, setItemValue] = useState(todo.content);
  const ref= useRef();

  const modify = (data) => {

    const modifydata = {
      id : todo.id,
      content : itemValue,
      ...data

    }
    dispatch(modifyTodo(modifydata)); 
    setIsModify(false);
  };



  return (
    <div  className='border w-full' ref={ref}>
    <div className='flex gap-2 items-center  p-2'>
      <TimePicker time={time} setTime={setTime} />
      <input
        type='text'
        className='outline-none px-2 py-2 border'
        value={itemValue}
        onChange={(e) => setItemValue(e.target.value)}
        
        onKeyUp={(e) => {
          if (e.code === "Enter") modify({time, tag_color : tagColor});
        }}
      />
      <button
        className='px-2 py-1 bg-slate-400 text-white'
        onClick={() => setOver(!over)}
      >
        
      </button>
      </div>
      {over ? (
        <div className='  flex gap-2 p-3 right-0 bg-white shadow-md justify-center'>
          <ColorRadio setColor={setTagColor} color={tagColor} tagColor='red' />
          <ColorRadio
            setColor={setTagColor}
            color={tagColor}
            tagColor='yellow'
          />
          <ColorRadio
            setColor={setTagColor}
            color={tagColor}
            tagColor='green'
          />
          <ColorRadio
            setColor={setTagColor}
            color={tagColor}
            tagColor='indigo'
          />
          <ColorRadio
            setColor={setTagColor}
            color={tagColor}
            tagColor='violet'
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};



export default TodoItem;