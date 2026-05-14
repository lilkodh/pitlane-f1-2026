import RaceCard from './race-card'

const DUMMY_RACES = [
  {
    id: 'monaco',
    title: 'Monaco Grand Prix',
    subtitle: 'Circuit de Monaco',
    image: '/src/assets/races/monaco-track.jpg'
  },
  {
    id: 'silverstone',
    title: 'British Grand Prix',
    subtitle: 'Silverstone Circuit',
    image: '/src/assets/races/silverstone-track.jpg'
  },
  {
    id: 'las-vegas',
    title: 'Las Vegas Grand Prix',
    subtitle: 'Las Vegas Strip Circuit',
    image: '/src/assets/races/vegas-track.jpg'
  }
]

export default function CardGrid() {
  return (
    <section className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <div className="mb-12">
        <h2 className="font-hero text-5xl font-black text-white mb-2">2026 CALENDAR</h2>
        <p className="text-[#39FF88] tracking-[0.2em] uppercase text-sm font-bold">The New Era of Speed</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_RACES.map(race => (
          <RaceCard key={race.id} race={race} />
        ))}
      </div>
    </section>
  )
}
