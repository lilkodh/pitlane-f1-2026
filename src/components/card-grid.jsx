import RaceCard from './race-card.jsx';
import monacoImg from '../assets/monaco-track.png';
import silverstoneImg from '../assets/silverstone-track.png';
import suzukaImg from '../assets/track-3.jpg'; // Fallback for Suzuka

// ============================================================
// CardGrid — Modular 4D race card showcase
// Features 3 specific cards with highly relevant technical data
// ============================================================

const DUMMY_RACES = [
  {
    id: 'monaco',
    name: 'FORMULA 1 GRAND PRIX DE MONACO 2026',
    city: 'Monte Carlo',
    flag: '🇲🇨',
    round: 8,
    raceDate: '24 MAY',
    heroColor: '#FF1E00',
    circuit: 'Circuit de Monaco',
    length: '3.337 km',
    laps: 78,
    type: 'Street Circuit',
    image: monacoImg
  },
  {
    id: 'silverstone',
    name: 'FORMULA 1 BRITISH GRAND PRIX 2026',
    city: 'Silverstone',
    flag: '🇬🇧',
    round: 12,
    raceDate: '05 JUL',
    heroColor: '#004225',
    circuit: 'Silverstone Circuit',
    length: '5.891 km',
    laps: 52,
    type: 'Permanent Circuit',
    image: silverstoneImg
  },
  {
    id: 'suzuka',
    name: 'FORMULA 1 JAPANESE GRAND PRIX 2026',
    city: 'Suzuka',
    flag: '🇯🇵',
    round: 4,
    raceDate: '05 APR',
    heroColor: '#FFFFFF',
    circuit: 'Suzuka International Racing Course',
    length: '5.807 km',
    laps: 53,
    type: 'Permanent (Figure-8)',
    image: suzukaImg
  },
  {
    id: 'singapore',
    name: 'FORMULA 1 SINGAPORE GRAND PRIX 2026',
    city: 'Singapore',
    flag: '🇸🇬',
    round: 18,
    raceDate: '04 OCT',
    heroColor: '#FFD60A',
    circuit: 'Marina Bay Street Circuit',
    length: '4.940 km',
    laps: 61,
    type: 'Night Street Circuit',
    image: 'https://images.unsplash.com/photo-1525625239911-376c500730d4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'las-vegas',
    name: 'FORMULA 1 LAS VEGAS GRAND PRIX 2026',
    city: 'Las Vegas',
    flag: '🇺🇸',
    round: 23,
    raceDate: '21 NOV',
    heroColor: '#A855F7',
    circuit: 'Las Vegas Strip Circuit',
    length: '6.201 km',
    laps: 50,
    type: 'Night Street Circuit',
    image: 'https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'miami',
    name: 'FORMULA 1 MIAMI GRAND PRIX 2026',
    city: 'Miami',
    flag: '🇺🇸',
    round: 6,
    raceDate: '03 MAY',
    heroColor: '#FF6B35',
    circuit: 'Miami International Autodrome',
    length: '5.412 km',
    laps: 57,
    type: 'Street Circuit',
    image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'monza',
    name: 'FORMULA 1 ITALIAN GRAND PRIX 2026',
    city: 'Monza',
    flag: '🇮🇹',
    round: 16,
    raceDate: '06 SEP',
    heroColor: '#E8002D',
    circuit: 'Autodromo Nazionale Monza',
    length: '5.793 km',
    laps: 53,
    type: 'Permanent (High Speed)',
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'brazil',
    name: 'FORMULA 1 BRAZILIAN GRAND PRIX 2026',
    city: 'São Paulo',
    flag: '🇧🇷',
    round: 21,
    raceDate: '08 NOV',
    heroColor: '#009C3B',
    circuit: 'Autódromo José Carlos Pace',
    length: '4.309 km',
    laps: 71,
    type: 'Permanent Circuit',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800'
  }
];

export default function CardGrid() {
  return (
    <section style={{
      padding: '120px 5%',
      background: '#050505',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          marginBottom: '60px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#39FF88',
            letterSpacing: '0.2em'
          }}>
            UPCOMING 2026 HIGHLIGHTS
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '3rem',
            fontWeight: 800,
            color: '#FFF',
            letterSpacing: '-0.02em'
          }}>
            The Pillars of Speed
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px'
        }}>
          {DUMMY_RACES.map((race, idx) => (
            <RaceCard 
              key={race.id} 
              race={race} 
              index={idx} 
              image={race.image} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
