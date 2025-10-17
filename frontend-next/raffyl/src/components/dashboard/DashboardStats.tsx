import { StatCard } from "./StatCard";

interface DashboardStatsProps {
  totalRafflesCreated: number;
  activeRaffles: number;
  totalParticipants: number;
  totalPayouts: number;
}

export function DashboardStats({
  totalRafflesCreated,
  activeRaffles,
  totalParticipants,
  totalPayouts,
}: DashboardStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <StatCard title="Total raffles created" value={totalRafflesCreated} />
      <StatCard title="Active raffles" value={activeRaffles} />
      <StatCard title="Total participants" value={totalParticipants} />
      <StatCard title="Total payouts" value={totalPayouts} />
    </div>
  );
}