

export const calculatePeriod = (first_date,  secend_date) => {

  console.log(first_date,secend_date);
  let hour = null;
  let day = null;
  let betweenTime = Math.floor((first_date.getTime() - secend_date.getTime()) /1000/60/60);
  console.log(betweenTime);


  if(betweenTime > 0 && betweenTime <=24){
    return betweenTime + "시간";

  }else if(betweenTime> 24) {
    day = Math.floor(betweenTime/24);
    hour = betweenTime%24; 
    return day +"일 " + hour +"시간" ;
    
  }
}

