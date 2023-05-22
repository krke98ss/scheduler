import { isSameDay } from 'date-fns';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';


const TodoList = ({ day }) => {
  
  const todoList = useSelector((state) => state.todo.todoList);



  let render = todoList.map((todo, index) => {
    if (isSameDay(new Date(todo.date), day)) {
      return <TodoItem todo={todo} key={index} />;
    }
    return null;
  }).filter((data) => data !== null);

  if(render.length === 0){
    render = <span className='border-x-8 py-3  border-pink-300 text-center'>해당 일정이 없습니다.</span>
  }
  
  return <div className='p-2 flex flex-col gap-3 min-h-[150px] justify-center'>{render}</div>;
};

export default TodoList;