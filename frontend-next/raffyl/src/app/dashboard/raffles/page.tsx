import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RafflesDashboardPage() {
  // Mock data - in real app this would come from API/database
  const stats = {
    totalRafflesCreated: 0,
    activeRaffles: 0,
    totalParticipants: 0,
    totalPayouts: 0,
  };

  const hasRaffles = stats.totalRafflesCreated > 0;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-dark-bg overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar activeItem="raffles" />
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                Raffles
              </p>
              <Link href="/create-raffle">
                <Button className="bg-dark-secondary hover:bg-dark-secondary/80 text-white h-8 px-4 text-sm font-medium">
                  + Create Raffle
                </Button>
              </Link>
            </div>
            <DashboardStats {...stats} />
            {!hasRaffles && <EmptyState />}
          </div>
        </div>
      </div>
    </div>
  );
}