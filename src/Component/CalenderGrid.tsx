const CalenderGrid = ({ currentDate,SetSidebarVisible,setSelectedDate }: { currentDate: Date,SetSidebarVisible:any,setSelectedDate:any }) => {
  //getting year
  const year = currentDate.getFullYear();
  //getting month
  const month = currentDate.getMonth();

  //getting the start day of week of the month
  const StartDay = new Date(year, month).getDay();

  //getting total Days in month
  const DaysInMonth = new Date(year, month + 1, 0).getDate();

  //for storing dates on month
  const Dates = [];

  //Storing the null value for previous days left in previous month
  for (let i = 0; i < StartDay; i++) {
    Dates.push(null);
  }

  //now storing the Dates
  for (let i = 1; i <= DaysInMonth; i++) {
    Dates.push(new Date(year, month, i));
  }

  // const Today:Date=new Date();
  //for comparing if the today is same date

  function Event(date:Date)
  {
    SetSidebarVisible(true);
    setSelectedDate(date)
  }

  const Days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="grid grid-cols-7 w-full">
        {Days.map((item: string) => {
          return (
            <div key={item} className="flex justify-center border p-3 bg-slate-100">
              {item}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 w-full">
        {Dates.map((item: any,index:number) => {
          return (
            <div key={index} className={` flex justify-center border p-3`} onClick={()=>Event(item)}>
              {item ? item?.getDate() : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CalenderGrid;
