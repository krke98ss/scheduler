import { format, getMonth } from 'date-fns';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


const Header = ({ currentMonth, prevMonth, nextMonth }) => {
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

export default Header