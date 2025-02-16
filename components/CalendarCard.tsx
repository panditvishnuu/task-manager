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
  <Card className="neon-border">
    <CardHeader>
      <CardTitle>Task Calendar</CardTitle>
    </CardHeader>
    <CardContent>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        classNames={{
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          head_cell: "text-muted-foreground font-normal text-[0.8rem]",
        }}
      />
    </CardContent>
  </Card>
);
