import { useState } from "react";
import "./App.css";
import CalenderGrid from "./Component/CalenderGrid";
import MonthSwitcher from "./Component/MonthSwitcher";
import EventList from "./Component/EventList";
import CreateEventModal from "./Component/CreateEventModal";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [SidebarVisible, SetSidebarVisible] = useState<boolean>(false);
  const [SelectedDate, setSelectedDate] = useState(null);
  const [CreateEventVisible, setVisible] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full relative">
      <div>
        <h1>Event Calender</h1>
      </div>
      <MonthSwitcher
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <CalenderGrid
        currentDate={currentDate}
        SetSidebarVisible={SetSidebarVisible}
        setSelectedDate={setSelectedDate}
      />
      {SidebarVisible && (
        <EventList
          SetSidebarVisible={SetSidebarVisible}
          SelectedDate={SelectedDate}
          setVisible={setVisible}
        />
      )}
      {
        CreateEventVisible && <CreateEventModal setVisible={setVisible}/>
      }
    </div>
  );
}

export default App;
