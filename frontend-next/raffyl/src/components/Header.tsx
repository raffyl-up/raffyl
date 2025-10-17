import { Gem, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-dark-secondary px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <Gem size={16} className="text-white" />
        <h2 className="text-lg font-bold leading-tight tracking-tight">
          Raffyl
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          <Link
            href="/"
            className="text-sm font-medium leading-normal text-white hover:text-text-secondary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/create-raffle"
            className="text-sm font-medium leading-normal text-white hover:text-text-secondary transition-colors"
          >
            Create
          </Link>
          <Link
            href="/my-raffles"
            className="text-sm font-medium leading-normal text-white hover:text-text-secondary transition-colors"
          >
            My Raffles
          </Link>
        </nav>
        <div className="flex gap-2 items-center">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-blue text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-blue/90 transition-colors">
            <span className="truncate">Connect Wallet</span>
          </button>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-dark-secondary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-dark-secondary/80 transition-colors">
            <span className="truncate">Sign Up</span>
          </button>
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-dark-secondary text-white gap-2 px-2.5 hover:bg-dark-secondary/80 transition-colors">
            <HelpCircle size={20} className="text-white" />
          </button>
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-dark-secondary">
            <Image
              src="https://i.pravatar.cc/150?img=1"
              alt="User avatar"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        </div>
      </div>
    </header>
  );
}