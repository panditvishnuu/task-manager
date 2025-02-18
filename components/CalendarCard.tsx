import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CalendarCardProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  selectedDate,
  setSelectedDate,
}) => (
  <Card className="border">
    <CardHeader className="p-4 pb-2">
      <CardTitle className="text-sm font-medium">Task Calendar</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        classNames={{
          day: "h-7 w-7 p-0 text-sm font-normal aria-selected:opacity-100",
          head_cell: "text-muted-foreground font-normal text-[0.8rem]",
        }}
      />
    </CardContent>
  </Card>
);
