import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

interface StatsCardProps {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  totalTasks,
  completedTasks,
  completionPercentage,
}) => (
  <Card className="neon-border">
    <CardHeader>
      <CardTitle>Task Statistics</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <StatItem label="Total Tasks" value={totalTasks} />
      <StatItem label="Completed Tasks" value={completedTasks} />
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Completion Progress
        </p>
        <Progress value={completionPercentage} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">
          {completionPercentage}%
        </p>
      </div>
    </CardContent>
  </Card>
);

interface StatItemProps {
  label: string;
  value: number;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
