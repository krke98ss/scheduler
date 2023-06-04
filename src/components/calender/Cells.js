
import { addDays, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../common/common';
import { useEffect } from 'react';



const Cells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  onDateDoubleClick,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  


  
  

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
                ? "border-violet-300 border-2 font-bold"
                : ""
            }
            ${i === 0 ? "bg-red-100" : ""}
              hover:bg-slate-100 flex-grow shadow-md overflow-hidden text-xs w-full relative
              min-h-[3.5rem]
              md:min-h-[4rem] md:text-sm
              lg:min-h-[5rem]
              xl:min-h-[6rem] xl:text-base
              2xl:min-h-[7rem]
              
              
              `}
          key={day}
          onClick={() => onDateClick(cloneday)}
          onDoubleClick={() => onDateDoubleClick(cloneday)}
        >
        
          
          {format(day, "M") === month ? <p className='ml-2 mt-2 mb-1'>{formmatedDate}</p> : <p className='ml-2 mt-2 mb-1 text-gray-300'>{formmatedDate}</p>}
          {scheduleList.map((schedule, index) => {
          if (isSameDay(new Date(schedule.start_date), cloneday)) {
            return <div className={`h-5 bg-indigo-300 w-full text-center text-white font-normal text-xs ${index===1 ?  "bg-red-300" : ""}`}>{schedule.title}</div>
          } 
            if(new Date(schedule.start_date) < cloneday && cloneday < new Date(schedule.end_date)){
              return <div className={`h-5 bg-indigo-300 w-full ${index===1 ?  "bg-red-300" : ""}`}></div>
            }
          })} 
          <div>
            <ul className='ps-0 flex-col hidden lg:flex xl:gap-1 2xl:gap-2 ml-2'>
              {todoList.map((todo, index) => {
                if (isSameDay(new Date(todo.date), cloneday) ) {
                  return (
                    <li
                      className={`
                      ${todo.success ?  "text-gray-300" : ""} 
                      ${color[todo.tag_color] ||  "border-slate-500"} 
                      border-l-2 pl-2 text-[10px] font-normal text-ellipsis overflow-hidden whitespace-nowrap flex gap-[2px]
                      md:gap-1 
                      `}
                      key={index}
                    >
                      {todo.time ?<span className='text-amber-600'>{format(new Date(todo.time),"aa h:mm ")}</span>  : ""} 
                      {todo.content}
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
    rows.push(<div className='flex'>{days}</div>);
    days = [];
  }

  return <div className='cursor-pointer flex flex-col gap-[2px]'>{rows}</div>;
};

export default Cells