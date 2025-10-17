"use client";

import { Home, Users, Ticket, Wallet, Settings } from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = "raffles" }: SidebarProps) {
  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-dark-bg p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-base font-medium leading-normal">
            Raffyl
          </h1>
          <div className="flex flex-col gap-2">
            <SidebarNavItem
              href="/dashboard"
              icon={Home}
              label="Overview"
              isActive={activeItem === "overview"}
            />
            <SidebarNavItem
              href="/dashboard/communities"
              icon={Users}
              label="My Communities"
              isActive={activeItem === "communities"}
            />
            <SidebarNavItem
              href="/dashboard/raffles"
              icon={Ticket}
              label="Raffles"
              isActive={activeItem === "raffles"}
            />
            <SidebarNavItem
              href="/dashboard/funds"
              icon={Wallet}
              label="Funds & Payouts"
              isActive={activeItem === "funds"}
            />
            <SidebarNavItem
              href="/dashboard/settings"
              icon={Settings}
              label="Settings"
              isActive={activeItem === "settings"}
            />
          </div>
        </div>
        <Link href="/create-raffle">
          <Button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white h-10 px-4 text-sm font-bold">
            + Create Raffle
          </Button>
        </Link>
      </div>
    </div>
  );
}