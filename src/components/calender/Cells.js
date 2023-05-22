import { addDays, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { useSelector } from 'react-redux';

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

  const todoList = useSelector((state) => state.todo.todoList);
  console.log(todoList);

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
            <ol className='ps-0 list-decimal list-inside'>
              {todoList.map((todo, index) => {
                if (isSameDay(new Date(todo.date), cloneday)) {
                  return (
                    <li
                      className={`${todo.success ?  "text-gray-300" : ""} text-xs font-normal text-ellipsis overflow-hidden whitespace-nowrap `}
                      key={index}
                    >
                      {todo.content}
                    </li>
                  );
                }
                return;
              })}
            </ol>
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

export default Cells