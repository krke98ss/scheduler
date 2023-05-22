import { getDay } from 'date-fns';

const Days = ({selectedDate }) => {
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

export default Days;