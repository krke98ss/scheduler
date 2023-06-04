import DatePicker from 'react-datepicker';

const TimePicker = ({time, setTime}) => {
  console.log(time);
  
    return (
  time ?    
      <DatePicker
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={10}
      selected={new Date(time)} //when day is clicked
      onChange={(date) =>setTime(date)} //only when value has changed
      timeFormat="HH:mm"
      dateFormat="h:mm aa"
      className='border py-1 px-1 outline-none mr-1 w-full grow text-center'
      placeholderText='Time'
      
    />
    :
    <DatePicker
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={10}
    onChange={(date) =>setTime(date)} //only when value has changed
    timeFormat="HH:mm"
    dateFormat="h:mm aa"
    className='border py-1 px-1 outline-none  mr-1 w-full grow text-center'
    placeholderText='Time'
    
  />
    )
  
}

export default TimePicker