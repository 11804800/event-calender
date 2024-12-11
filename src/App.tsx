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
  //Event List for Pushing the
  const [events, setEvents] = useState<any>(JSON.parse(localStorage.getItem("events")||"{}"));

  const { format } = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
  });

  function handleAddNewEvent(newEvent: any) {
    //other wise it will show typescript error because its value is initially
    if (SelectedDate) {
      let EventData={};
      const DateKey=format(SelectedDate);
      if (events[format(SelectedDate)]) {
        EventData={...events,[DateKey]:[...(events[DateKey] || []),newEvent]};
        setEvents(EventData);
      }
      else{
        EventData={...events,[format(SelectedDate)]:[newEvent]};
        setEvents(EventData);
      }
      localStorage.setItem("events",JSON.stringify(EventData));
    }
    
  }

  function HandleDelete(EventIndex:number)
  {
    if(SelectedDate)
    {
      const newEvent=events[format(SelectedDate)].filter((item:any,index:number)=>index!==EventIndex);
      const EventData={...events,[format(SelectedDate)]:newEvent};
      setEvents(EventData);
      localStorage.setItem("events",JSON.stringify(EventData));
    }
  }

  function HandleEdit(EventIndex:number,Event:any)
  {
    console.log(EventIndex);
    if(SelectedDate)
      {
        let newEvent=events[format(SelectedDate)];
        newEvent[EventIndex]=Event;
        const EventData={...events,[format(SelectedDate)]:newEvent};
        setEvents(EventData);
        localStorage.setItem("events",JSON.stringify(EventData));
      }
  }

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
        events={events}
      />
      {SidebarVisible && (
        <EventList
          SetSidebarVisible={SetSidebarVisible}
          SelectedDate={SelectedDate}
          setVisible={setVisible}
          events={events}
          HandleDelete={HandleDelete}
          HandleEdit={HandleEdit}
        />
      )}
      {CreateEventVisible && (
        <CreateEventModal
          setVisible={setVisible}
          SelectedDate={SelectedDate}
          handleAddNewEvent={handleAddNewEvent}
          events={events}
        />
      )}
    </div>
  );
}

export default App;
