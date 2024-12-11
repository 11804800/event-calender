import { useState } from "react";
import "./App.css";
import CalenderGrid from "./Component/CalenderGrid";
import MonthSwitcher from "./Component/MonthSwitcher";
import EventList from "./Component/EventList";
import CreateEventModal from "./Component/CreateEventModal";
import { Button } from "./components/ui/button";
import { format } from "./Component/utils";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [SidebarVisible, SetSidebarVisible] = useState<boolean>(false);
  const [SelectedDate, setSelectedDate] = useState(null);
  const [CreateEventVisible, setVisible] = useState(false);
  //Event List for Pushing the
  const [events, setEvents] = useState<any>(
    JSON.parse(localStorage.getItem("events") || "{}")
  );

  function handleAddNewEvent(newEvent: any) {
    //other wise it will show typescript error because its value is initially
    if (SelectedDate) {
      let EventData = {};
      const DateKey = format(SelectedDate);
      if (events[format(SelectedDate)]) {
        EventData = {
          ...events,
          [DateKey]: [...(events[DateKey] || []), newEvent],
        };
        setEvents(EventData);
      } else {
        EventData = { ...events, [format(SelectedDate)]: [newEvent] };
        setEvents(EventData);
      }
      localStorage.setItem("events", JSON.stringify(EventData));
    }
  }

  function HandleDelete(EventIndex: number) {
    if (SelectedDate) {
      const newEvent = events[format(SelectedDate)].filter(
        (item: any, index: number) => index !== EventIndex
      );
      const EventData = { ...events, [format(SelectedDate)]: newEvent };
      setEvents(EventData);
      localStorage.setItem("events", JSON.stringify(EventData));
    }
  }

  function HandleEdit(EventIndex: number, Event: any) {
    if (SelectedDate) {
      let newEvent = events[format(SelectedDate)];
      newEvent[EventIndex] = Event;
      const EventData = { ...events, [format(SelectedDate)]: newEvent };
      setEvents(EventData);
      localStorage.setItem("events", JSON.stringify(EventData));
    }
  }

  function ExportAsJson() {
    //converting to json
    const data = JSON.stringify(events);
    // creating blob
    const blob = new Blob([data], { type: "application/json" });
    //creating url using createObjectUrl
    const url = URL.createObjectURL(blob);
    //creating an href tag
    const a = document.createElement("a");
    //setting the href as url
    a.href = url;
    //setting file name
    a.download = "data.json";
    //calling click to download the file
    a.click();

    //now destroying the url
    URL.revokeObjectURL(url);
  }

  const HandleDragStart = (e: any, newEvent: any) => {
    //storing the transfer data event data
    e.dataTransfer.setData("task", JSON.stringify(newEvent));
  };

  const HandleDragDrop = (e: any, date: Date) => {
    const DateKey = format(date);
    //getting the transfer data
    const newEvent = JSON.parse(e.dataTransfer.getData("task"));
    let EventData = {
      ...events,
      [DateKey]: [...(events[DateKey] || []), newEvent],
    };
    setEvents(EventData);
    localStorage.setItem("events", JSON.stringify(EventData));
  };

  const HandleDragOver = (e: any) => {
    //allow the event to drop
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-around items-center w-full h-[80dvh] relative p-2">
      <Button className="fixed bottom-10 left-4" onClick={ExportAsJson}>
        Export as Json
      </Button>
      <div className="h-[10%] ">
        <img src="/image.png" alt="Header Image" className="w-[250px]" />
      </div>
      <div className="flex flex-col gap-2 rounded-md shadow-lg  items-center justify-center">
        <MonthSwitcher
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <CalenderGrid
          currentDate={currentDate}
          SetSidebarVisible={SetSidebarVisible}
          setSelectedDate={setSelectedDate}
          SelectedDate={SelectedDate}
          events={events}
          HandleDragDrop={HandleDragDrop}
          HandleDragOver={HandleDragOver}
        />
      </div>
      {SidebarVisible && (
        <EventList
          SetSidebarVisible={SetSidebarVisible}
          SelectedDate={SelectedDate}
          setVisible={setVisible}
          events={events}
          HandleDelete={HandleDelete}
          HandleEdit={HandleEdit}
          HandleDragStart={HandleDragStart}
          setSelectedDate={setSelectedDate}
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
