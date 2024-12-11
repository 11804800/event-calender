import { Button } from "../components/ui/button";
const EventList = ({
  SelectedDate,
  SetSidebarVisible,
  setVisible,
}: {
  SelectedDate: Date | null;
  SetSidebarVisible: any;
  setVisible: any;
}) => {
  const { format } = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
  });

  return (
    <div className="w-[100%] md:w-[400px] bg-white h-[100dvh] absolute top-0 right-0 shadow-md">
      <div className="flex gap-3 p-2">
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
      <div className="w-full flex flex-col justify-center items-center gap-4 h-[80%]">
        <h2 className="font-medium text-lg">No Event Scheduled Yet</h2>
        <Button variant="destructive" onClick={() => setVisible(true)}>
          Schedule
        </Button>
      </div>
    </div>
  );
};
export default EventList;
