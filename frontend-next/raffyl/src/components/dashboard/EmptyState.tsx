import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col px-4 py-6">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-[360px] aspect-video rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1708919166928-71cba69fcd0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxwbGFudCUyMGJveCUyMGNhcmRib2FyZCUyMGdyb3d0aCUyMGlzb21ldHJpY3xlbnwwfDB8fHwxNzYwNjkzMzY2fDA&ixlib=rb-4.1.0&q=85"
            alt="Empty state illustration - James Nilsson on Unsplash"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </div>
        <div className="flex max-w-[480px] flex-col items-center gap-2">
          <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
            You haven&apos;t created any raffles yet.
          </p>
          <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">
            Create your first raffle and start engaging your community.
          </p>
        </div>
        <Link href="/create-raffle">
          <Button className="bg-dark-secondary hover:bg-dark-secondary/80 text-white h-10 px-4 text-sm font-bold">
            + Create Raffle
          </Button>
        </Link>
      </div>
    </div>
  );
}