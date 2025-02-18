import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DeadlinesCardProps {
  deadlines: { id: string; title: string; dueDate: string }[];
  onToggleCompletion: (id: string) => void;
}

export const DeadlinesCard: React.FC<DeadlinesCardProps> = ({
  deadlines,
  onToggleCompletion,
}) => (
  <Card className="border">
    <CardHeader className="p-4 pb-2">
      <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      {deadlines.length > 0 ? (
        <div className="space-y-2">
          {deadlines.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between group"
            >
              <div>
                <p className="text-sm font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onToggleCompletion(task.id)}
              >
                Done
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No upcoming deadlines.</p>
      )}
    </CardContent>
  </Card>
);
