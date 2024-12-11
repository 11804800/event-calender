import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "./utils";

const EditEvent = ({
  SelectedDate,
  events,
  setEditModalActive,
  HandleEdit,
  Index,
}: {
  SelectedDate: any;
  events: any;
  setEditModalActive: any;
  HandleEdit: any;
  Index: number;
}) => {
  //regex pattern for input pattern only
  var regex = new RegExp("^[a-zA-Z]*$");

  //filtering the data
  const EventData: any = events[format(SelectedDate)][Index];
  
  const [Event, setEvent] = useState({
    name: EventData?.name,
    startTime: EventData?.startTime,
    endTime: EventData?.endTime,
    description: EventData?.description,
  });

  const [Submitted, setSubmitted] = useState(false);

  function OnInputChange(e: any) {
    setEvent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //filtering the data based on index so the time will not overlap with others
  function IsTimeOverLapping(startTime: string, endTime: string) {
    const DateKey = format(SelectedDate);
    const list = events[DateKey];
    return list?.filter((__item:any,index:number)=>index!==Index)?.some((item: any) => {
      return startTime <= item.endTime && endTime >= item.startTime;
    });
  }

  //for form submit
  function OnFormSubmit() {
    if (Event.name && Event.startTime && Event.endTime) {
      if (Event.startTime > Event.endTime) {
        console.log("Please Endtime Cannot be less than start time");
      } else if (IsTimeOverLapping(Event.startTime, Event.endTime)) {
        return;
      } else if (!regex.test(Event.name)) {
        console.log(regex.test(Event.name));
      } else {
        HandleEdit(Index,Event);
        setEditModalActive(false);
        toast("Event has been Edited", {
          action: {
            label: "close",
            onClick: () => console.log("close"),
          },
        });
      }
    } else {
      setSubmitted(true);
    }
  }

  return (
    <div className="absolute top-0 left-0 w-[100%] h-[100dvh] bg-white md:bg-black/15 flex justify-center items-center">
      <div className="flex flex-col gap-3 p-2 rounded md:shadow-md bg-white w-[100%] md:w-[70%] h-[80%]">
        <div className="flex justify-between items-center text-xl font-medium p-4">
          <h1>Edit Event </h1>
          <Button
            variant="ghost"
            className="text-xl"
            onClick={() => setEditModalActive(false)}
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
          {IsTimeOverLapping(Event.startTime, Event.endTime) && (
            <p className="text-[12px] text-[brown] font-medium">
              Time is Overlapping with previous events
            </p>
          )}
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
export default EditEvent;
