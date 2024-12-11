import { Button } from "../components/ui/button";
const EventList = ({
  SelectedDate,
  SetSidebarVisible,
  setVisible,
  events,
  HandleDelete,
}: {
  SelectedDate: Date | null;
  SetSidebarVisible: any;
  setVisible: any;
  events: any;
  HandleDelete: any;
}) => {
  const { format } = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
  });

  const Datekey = SelectedDate && format(SelectedDate);
  const eventList: any = events[Datekey || ""];

  return (
    <div className="w-[100%] md:w-[400px] flex flex-col gap-4 bg-white h-[100dvh] absolute top-0 right-0 shadow-md">
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
      <div className="w-full h-[80%] flex flex-col justify-center items-center md:justify-start">
        {eventList?.length ? (
          <>
            <Button variant="outline" onClick={() => setVisible(true)}>
              Schedule Another
            </Button>
            <div className="flex flex-col gap-2 w-[80%] h-full p-2 overflow-y-auto">
              {eventList?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-2 text-sm font-medium border-2 rounded-sm shadow-sm w-full p-2"
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
                      <Button variant="ghost" className="text-blue-700">
                        Edit
                      </Button>
                      <Button variant="ghost" className="text-[brown]" onClick={()=>HandleDelete(index)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className=" flex flex-col justify-center items-center gap-4 md:h-[80%] h-[40%] shadow-lg w-[80%] md:w-full md:shadow-none">
            <h2 className="font-medium text-lg">No Event Scheduled Yet</h2>
            <Button variant="destructive" onClick={() => setVisible(true)}>
              Schedule
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventList;
