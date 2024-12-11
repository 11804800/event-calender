import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const CreateEventModal = ({
  setVisible,
  SelectedDate,
  handleAddNewEvent,
  events,
}: {
  setVisible: any;
  SelectedDate: any;
  handleAddNewEvent: any;
  events: any;
}) => {
  var regex = new RegExp("^[a-zA-Z]*$");

  const [Event, setEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [Submitted, setSubmitted] = useState(false);

  function OnInputChange(e: any) {
    setEvent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const { format } = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
  });

  function IsTimeOverLapping(startTime: string, endTime: string) {
    const DateKey = format(SelectedDate);
    const list = events[DateKey];
    return list?.some((item: any) => {
      return startTime <= item.endTime && endTime >= item.startTime;
    });
  }

  function OnFormSubmit() {
    if (Event.name && Event.startTime && Event.endTime) {
      if (Event.startTime > Event.endTime) {
        console.log("Please Endtime Cannot be less than start time");
      }
      else if(IsTimeOverLapping(Event.startTime, Event.endTime))
      {
        return ;
      }
      else if(!regex.test(Event.name))
      {
        console.log(regex.test(Event.name));
      }
      else {
        handleAddNewEvent(Event);
        toast("Event has been created", {
          description: format(SelectedDate),
          action: {
            label: "close",
            onClick: () => console.log("close"),
          },
        });
        setEvent({
          name:"",
          endTime:"",
          startTime:"",
          description:""
        });
        setVisible(false);
      }
    }
    else
    {
      setSubmitted(true);
    }
  }

  return (
    <div className="absolute top-0 left-0 w-[100%] h-[100dvh] bg-white md:bg-black/15 flex justify-center items-center z-[9999]">
      <div className="flex flex-col gap-3 p-2 rounded md:shadow-md bg-white w-[100%] md:w-[70%] h-[80%]">
        <div className="flex justify-between items-center text-xl font-medium p-4">
          <h1>Create Event </h1>
          <Button
            variant="ghost"
            className="text-xl"
            onClick={() => setVisible(false)}
          >
            &times;
          </Button>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Enter a name"
            name="name"
            value={Event.name}
            onChange={(e) => OnInputChange(e)}
          />
          {Submitted && !Event.name && (
            <p className="text-[12px] text-[brown] font-medium">Required</p>
          )}
          {!regex.test(Event.name) && (
            <p className="text-[12px] text-[brown] font-medium">
              Numeric & Special Characters are Not Allowed
            </p>
          )}
          <div>
            <Label>Start Time</Label>
            <Input
              type="time"
              name="startTime"
              onChange={(e) => OnInputChange(e)}
              value={Event.startTime}
            />
            {Submitted && !Event.startTime && (
              <p
                className="text-[12px] text-[brown] font-medium"
                id="name-required"
              >
                Required
              </p>
            )}
          </div>
          <div>
            <Label>End Time</Label>
            <Input
              type="time"
              name="endTime"
              onChange={(e) => OnInputChange(e)}
              value={Event.endTime}
            />
            {Submitted && !Event.endTime && (
              <p
                className="text-[12px] text-[brown] font-medium"
                id="name-required"
              >
                Required
              </p>
            )}
          </div>
          {Event.startTime > Event.endTime && (
            <p className="text-[12px] text-[brown] font-medium">
              Event Cannot End Before Start
            </p>
          )}
          {
            IsTimeOverLapping(Event.startTime, Event.endTime) && 
            <p className="text-[12px] text-[brown] font-medium">
            Time is Overlapping with previous events
          </p>
          }
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Type your message here."
              name="description"
              value={Event?.description}
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div>
            <Button onClick={OnFormSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateEventModal;
