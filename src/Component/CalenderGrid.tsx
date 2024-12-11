import { format } from "./utils";
const CalenderGrid = ({ currentDate,SetSidebarVisible,SelectedDate,setSelectedDate,events }: { currentDate: Date,SetSidebarVisible:any,SelectedDate:any,setSelectedDate:any,events:any }) => {
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
 
 //for comparing if the today is same date
  const Today:Date=new Date();
 

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
            <div key={index} className={`${format(SelectedDate) == format(item) && "bg-blue-100"} ${format(Today) == format(item) && "bg-blue-200"} flex  justify-center border p-4 hover:bg-slate-100`} onClick={()=>Event(item)}>
              {item ? item?.getDate() : null}
              {
                events[format(item)]?.length>0 && <span className="p-1 bg-blue-800 rounded-full w-fit h-fit"></span>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CalenderGrid;
