import { RaceCard } from './race-card.jsx';

/**
 * Sticky stacking “broadcast” strip — next few races scale slightly as you scroll (desktop).
 */
export function FeaturedRaceStack({ races }) {
  if (!races?.length) return null;

  return (
    <div className="mb-16 hidden lg:block">
      <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-f1red">Upcoming rounds</p>
      <p className="mt-1 max-w-xl text-sm text-titanium/55">
        Sticky cards — paddock-style stack: each round slides over the last with a subtle scale-down.
      </p>
      <div className="mx-auto mt-8 max-w-2xl">
        {races.map((race, i) => (
          <section
            key={race.id}
            className="relative mb-[min(72vh,720px)] last:mb-8"
            style={{ zIndex: races.length - i }}
          >
            <div className="sticky top-28">
              <div
                className="origin-top shadow-card-lift transition-transform duration-500 ease-pit"
                style={{
                  transform: `scale(${1 - i * 0.04}) translateY(${i * 10}px)`,
                }}
              >
                <RaceCard race={race} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
