import Image from "next/image";

const organizations = [
  {
    name: "Charity Foundation",
    description: "Supporting various charitable causes.",
    image:
      "https://images.unsplash.com/photo-1600408942710-9e0ccfe941c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwZm91bmRhdGlvbiUyMGhlbHBpbmclMjBoYW5kcyUyMGhlYXJ0fGVufDB8Mnx8fDE3NjA2Mjg1MjZ8MA&ixlib=rb-4.1.0&q=85",
    alt: "Charity Foundation - Marek Studzinski on Unsplash",
  },
  {
    name: "Tech Innovators",
    description: "Driving innovation in technology.",
    image:
      "https://images.unsplash.com/photo-1635241161466-541f065683ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGdlb21ldHJpYyUyMHRlY2glMjBsb2dvfGVufDB8Mnx8fDE3NjA2Mjg1MjZ8MA&ixlib=rb-4.1.0&q=85",
    alt: "Tech Innovators - 愚木混株 Yumu on Unsplash",
  },
  {
    name: "Community Builders",
    description: "Building strong community bonds.",
    image:
      "https://images.unsplash.com/photo-1522973717924-b10fe4e185cc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxjaGFyaXR5JTIwZm91bmRhdGlvbiUyMGhlbHBpbmclMjBoYW5kcyUyMGhlYXJ0fGVufDB8Mnx8fDE3NjA2Mjg1MjZ8MA&ixlib=rb-4.1.0&q=85",
    alt: "Community Builders - Alvin Mahmudov on Unsplash",
  },
  {
    name: "Creative Collective",
    description: "Fostering creativity and collaboration.",
    image:
      "https://images.unsplash.com/photo-1600408963711-2eca888e587c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjaGFyaXR5JTIwZm91bmRhdGlvbiUyMGhlbHBpbmclMjBoYW5kcyUyMGhlYXJ0fGVufDB8Mnx8fDE3NjA2Mjg1MjZ8MA&ixlib=rb-4.1.0&q=85",
    alt: "Creative Collective - Marek Studzinski on Unsplash",
  },
];

export function Organizations() {
  return (
    <section>
      <h2 className="heading-section text-white px-4 pb-3 pt-5">
        Top Organizations
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {organizations.map((org) => (
          <div key={org.name} className="flex flex-col gap-3 text-center pb-3">
            <div className="px-4">
              <div className="w-full aspect-square rounded-full overflow-hidden relative bg-dark-secondary">
                <Image
                  src={org.image}
                  alt={org.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                {org.name}
              </p>
              <p className="text-text-secondary text-sm font-normal leading-normal">
                {org.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}