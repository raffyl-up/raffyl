export function Hero() {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4 relative"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1653110685395-69bf7f9fc1ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx3b29kZW4lMjB3aGVlbCUyMHJhZmZsZSUyMHdoZWVsJTIwbG90dGVyeSUyMHdoZWVsJTIwY2lyY3VsYXIlMjByaW5nc3xlbnwwfDB8fHwxNzYwNjI4NTI2fDA&ixlib=rb-4.1.0&q=85")',
          }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white heading-hero @[480px]:text-5xl">
              Fun. Fair. Instant Raffles.
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
              Experience the thrill of decentralized raffles with Raffyl. Create
              or join raffles with complete transparency and instant payouts.
            </h2>
          </div>
          <div className="flex-wrap gap-3 flex justify-center">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary-blue text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base hover:bg-primary-blue/90 transition-colors">
              <span className="truncate">Create Raffle</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-dark-secondary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base hover:bg-dark-secondary/80 transition-colors">
              <span className="truncate">Join Raffle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}