import { Button } from "../components/ui/button";

const MonthSwitcher = ({ currentDate, setCurrentDate }:{currentDate:Date,setCurrentDate:any}) => {
  //for previous month
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  //function for next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };
  return (
    <div className="w-[100%] h-[100%] flex gap-4 justify-between p-3 mb-5">
      <Button onClick={prevMonth}>Prev</Button>
      <p className="text-lg font-medium">
        {currentDate.toLocaleString("default", { month: "long" })}{" "}
        {currentDate.getFullYear()}
      </p>
      <Button onClick={nextMonth}>Next</Button>
    </div>
  );
};
export default MonthSwitcher;
