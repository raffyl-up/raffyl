import Image from "next/image";

const raffles = [
  {
    title: "Grand Prize Raffle",
    prizePool: "$10,000",
    timeLeft: "7 days",
    image:
      "https://images.unsplash.com/photo-1577174787901-1af99a1227af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx3b29kJTIwY2lyY3VsYXIlMjByaW5ncyUyMHRleHR1cmV8ZW58MHwwfHx8MTc2MDYyODUyNnww&ixlib=rb-4.1.0&q=85",
    alt: "Grand Prize Raffle - Denis Agati on Unsplash",
  },
  {
    title: "Community Support Raffle",
    prizePool: "$5,000",
    timeLeft: "3 days",
    image:
      "https://images.unsplash.com/photo-1706719683266-9924744c1c9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHx3b29kJTIwc2hlbGwlMjBvcmdhbmljJTIwdGV4dHVyZXxlbnwwfDB8fHwxNzYwNjI4NTI2fDA&ixlib=rb-4.1.0&q=85",
    alt: "Community Support Raffle - Woliul Hasan on Unsplash",
  },
  {
    title: "Innovation Fund Raffle",
    prizePool: "$2,500",
    timeLeft: "1 day",
    image:
      "https://images.unsplash.com/photo-1683778203265-7dc8ff00df18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx3b29kJTIwZ3JhaW4lMjB0ZXh0dXJlJTIwbmF0dXJhbHxlbnwwfDB8fHwxNzYwNjI4NTI3fDA&ixlib=rb-4.1.0&q=85",
    alt: "Innovation Fund Raffle - Greg Rosenke on Unsplash",
  },
];

export function TrendingRaffles() {
  return (
    <section>
      <h2 className="heading-section text-white px-4 pb-3 pt-5">
        Trending Raffles
      </h2>
      <div className="flex overflow-x-auto scrollbar-hidden">
        <div className="flex items-stretch p-4 gap-3">
          {raffles.map((raffle) => (
            <div
              key={raffle.title}
              className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden relative bg-dark-secondary">
                <Image
                  src={raffle.image}
                  alt={raffle.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div>
                <p className="text-white text-base font-medium leading-normal">
                  {raffle.title}
                </p>
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Prize Pool: {raffle.prizePool} | Time Left: {raffle.timeLeft}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}