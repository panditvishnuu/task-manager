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
  <Card className="neon-border">
    <CardHeader>
      <CardTitle>Upcoming Deadlines</CardTitle>
    </CardHeader>
    <CardContent>
      {deadlines.length > 0 ? (
        <div className="space-y-3">
          {deadlines.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between group"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onToggleCompletion(task.id)}
              >
                Mark as Done
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No upcoming deadlines.</p>
      )}
    </CardContent>
  </Card>
);
