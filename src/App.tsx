import { useState } from "react";
import "./App.css";
import CalenderGrid from "./Component/CalenderGrid";
import MonthSwitcher from "./Component/MonthSwitcher";

function App() {
  const [currentDate,setCurrentDate]=useState(new Date());
  return (
    <>
      <MonthSwitcher currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalenderGrid />
    </>
  );
}

export default App;
