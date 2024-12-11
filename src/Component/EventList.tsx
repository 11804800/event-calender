import { useState } from "react";
import { Button } from "../components/ui/button";
import EditEvent from "./EditEvent";
import { Input } from "../components/ui/input";
const EventList = ({
  SelectedDate,
  SetSidebarVisible,
  setVisible,
  events,
  HandleDelete,
  HandleEdit,
  HandleDragStart
}: {
  SelectedDate: Date | null;
  SetSidebarVisible: any;
  setVisible: any;
  events: any;
  HandleDelete: any;
  HandleEdit: any;
  HandleDragStart:any
}) => {
  const { format } = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
  });

  const [Search,setSearch]=useState<string>("");

  const [EditModalActive,setEditModalActive]=useState<boolean>(false);
  const [Index,setIndex]=useState(-1);

  const handleEdit = (index: number) => {
    setEditModalActive(true);
    setIndex(index);
  };

  const Datekey = SelectedDate && format(SelectedDate);
  const eventList: any = events[Datekey || ""];

  return (
    <>
      <div className="w-[100%] md:w-[400px] flex flex-col gap-4 bg-white h-[100dvh] z-[99] fixed top-0 right-0 shadow-md">
        <div className="flex gap-4 p-2">
          <button
            className="hover:bg-slate-100 px-2 rounded-full"
            onClick={() => {
              SetSidebarVisible(false);
            }}
          >
            <img src="/right.png" width="14" height="10" />
          </button>
          <h3 className="text-md font-medium">Event List</h3>
        </div>
        <p className="py-2 px-4 text-sm font-medium">
          {SelectedDate && format(SelectedDate)}
        </p>
        {
          eventList?.length>0 &&
          <div className="p-2 flex gap-1">
            <Input placeholder="Keyword to filer events" onChange={(e)=>setSearch(e.target.value)}/>
            <Button variant="outline"><img src="/search.png" width="42"/></Button>
          </div>
        }
        <div className="w-full h-[80%] flex flex-col justify-center items-center md:justify-start">
          {eventList?.length ? (
            <div className="flex flex-col gap-2 h-[90%] w-full p-2">
              <Button variant="outline" onClick={() => setVisible(true)}>
                Schedule Another
              </Button>
              <div className="flex flex-col gap-2 w-[99%] h-full  overflow-y-auto Scrollbar py-2">
                {eventList?.filter((item:any)=>item?.name.includes(Search))?.map((item: any, index: number) => {
                  return (
                    //for drag and drop had to make draggable first
                    <div
                      key={index}
                      onDragStart={(e)=>HandleDragStart(e,item)}
                      draggable
                      className="flex flex-col gap-2 text-sm font-medium  rounded-sm drop-shadow-md bg-blue-100/30 shadow-md w-full p-2"
                    >
                      <p>{item?.name}</p>
                      <div className="flex gap-2 text-[12px] text-zinc-600">
                        <p>{item?.startTime}</p>
                        <p>{item?.endTime}</p>
                      </div>
                      <p className="text-[12px] text-zinc-700">
                        {item?.description && item?.description}
                      </p>
                      <div className="w-full justify-end items-end  flex gap-3">
                        <Button variant="ghost" className="text-blue-700 text-[12px]" onClick={()=>handleEdit(index)}>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-[brown] text-[12px]"
                          onClick={() => HandleDelete(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className=" flex flex-col justify-center items-center gap-4 md:h-[80%] h-[40%] shadow-lg w-[80%] md:w-full md:shadow-none">
              <h2 className="font-medium text-lg">No Event Scheduled Yet</h2>
              <Button variant="destructive" onClick={() => setVisible(true)}>
                Schedule
              </Button>
            </div>
          )}
                    {
            !eventList?.filter((item:any)=>item?.name.includes(Search)).length ?
            <div className="w-[100%] h-full flex justify-center">
              <p className="font-medium">Nothing Found</p>
            </div>
            :
            <></>
          }
        </div>
      </div>
      {
        EditModalActive &&
        <EditEvent SelectedDate={SelectedDate} events={events} HandleEdit={HandleEdit} setEditModalActive={setEditModalActive} Index={Index}/>
      }
    </>
  );
};
export default EventList;
