import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flag, RefreshCcw, Play } from 'lucide-react';
import { useThemeStore } from '../stores/theme-store.js';

// ============================================================
// F1 PITLANE ARCADE — Hyper-Realistic Machine Edition
// ============================================================

export default function RaceGamePage() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('IDLE'); 
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lane, setLane] = useState(1);
  const currentTheme = useThemeStore((s) => s.currentTheme);
  
  const requestRef = useRef();
  const gameRef = useRef({
    player: { x: 125, y: 500, targetX: 125, width: 50, height: 100 },
    obstacles: [],
    speed: 10,
    distance: 0,
    frame: 0
  });

  const update = () => {
    if (gameState !== 'PLAYING') return;
    const game = gameRef.current;
    game.frame++;
    game.distance += game.speed / 10;
    setScore(Math.floor(game.distance));
    game.player.x += (game.player.targetX - game.player.x) * 0.15;
    game.speed = 10 + (game.distance / 150);

    if (game.frame % Math.max(25, Math.floor(65 - game.speed)) === 0) {
      const l = Math.floor(Math.random() * 3);
      game.obstacles.push({
        x: l * 100 + 40, y: -150, width: 50, height: 100,
        color: ['#E8002D', '#3671C6', '#FF8000', '#00D2BE', '#006F62'][Math.floor(Math.random() * 5)]
      });
    }

    game.obstacles.forEach((obs, index) => {
      obs.y += game.speed;
      const m = 8;
      if (game.player.x + m < obs.x + obs.width - m && 
          game.player.x + game.player.width - m > obs.x + m &&
          game.player.y + m < obs.y + obs.height - m && 
          game.player.y + game.player.height - m > obs.y + m) {
        setGameState('GAMEOVER');
      }
      if (obs.y > 800) game.obstacles.splice(index, 1);
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Realistic Road Detail
    ctx.fillStyle = 'rgba(255,255,255,0.015)';
    for(let i=0; i<40; i++) {
        const gy = (game.frame * game.speed + i * 40) % canvas.height;
        ctx.fillRect(0, gy, canvas.width, 1);
    }

    // Lane Markers
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.setLineDash([80, 40]);
    const lo = (game.frame * game.speed) % 120;
    ctx.beginPath();
    ctx.moveTo(100, -150 + lo); ctx.lineTo(100, 850 + lo);
    ctx.moveTo(200, -150 + lo); ctx.lineTo(200, 850 + lo);
    ctx.stroke(); ctx.setLineDash([]);

    // 3D Curbs
    const so = (game.frame * game.speed) % 200;
    for(let i=-1; i<6; i++) {
        const y = i * 200 + so;
        for(let c=0; c<5; c++) {
            const cy = y + c * 40;
            ctx.fillStyle = (c % 2 === 0) ? '#E8002D' : '#FFF';
            ctx.fillRect(0, cy, 15, 40); ctx.fillRect(canvas.width - 15, cy, 15, 40); 
            ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(12, cy, 3, 40); ctx.fillRect(canvas.width - 15, cy, 3, 40);
        }
    }

    // HYPER-REALISTIC CAR RENDERING
    const drawF1Car = (x, y, color, isPlayer = false) => {
      const w = 50; const h = 100;
      
      // 1. Ambient Glow & Shadow
      const lg = ctx.createLinearGradient(x + w/2, y, x + w/2, y - 150);
      lg.addColorStop(0, isPlayer ? `${color}33` : 'rgba(255,255,255,0.1)');
      lg.addColorStop(1, 'transparent');
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.moveTo(x + 5, y); ctx.lineTo(x - 20, y - 150); ctx.lineTo(x + w + 20, y - 150); ctx.lineTo(x + w - 5, y); ctx.fill();
      
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath(); ctx.ellipse(x + w/2, y + h - 2, w/2 + 10, 15, 0, 0, Math.PI * 2); ctx.fill();

      // 2. Chassis Base
      ctx.fillStyle = '#080808'; 
      ctx.fillRect(x + 18, y + 25, w - 36, 70); 
      
      // 3. Bodywork (The "Nose")
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x + w/2 - 8, y + 5);
      ctx.lineTo(x + w/2 + 8, y + 5);
      ctx.lineTo(x + w/2 + 12, y + 45);
      ctx.lineTo(x + w/2 - 12, y + 45);
      ctx.fill();

      // 4. Sidepods
      ctx.fillRect(x + 8, y + 45, w - 16, 25);
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(x + 10, y + 48, 5, 20); ctx.fillRect(x + w - 15, y + 48, 5, 20); // Highlights

      // 5. Suspension & Axles
      ctx.strokeStyle = '#222'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x + 15, y + 35); ctx.lineTo(x - 5, y + 30); ctx.moveTo(x + w - 15, y + 35); ctx.lineTo(x + w + 5, y + 30); ctx.stroke(); // Front
      ctx.beginPath(); ctx.moveTo(x + 15, y + 80); ctx.lineTo(x - 5, y + 85); ctx.moveTo(x + w - 15, y + 80); ctx.lineTo(x + w + 5, y + 85); ctx.stroke(); // Rear

      // 6. Tires (Textured)
      ctx.fillStyle = '#050505';
      const drawTire = (tx, ty, tw, th) => {
          ctx.fillRect(tx, ty, tw, th);
          ctx.fillStyle = 'rgba(255,255,255,0.05)';
          ctx.fillRect(tx + tw/2 - 1, ty, 2, th); // Tire highlight
          ctx.fillStyle = '#050505';
      };
      drawTire(x - 14, y + 20, 14, 25); drawTire(x + w, y + 20, 14, 25);
      drawTire(x - 16, y + h - 45, 16, 30); drawTire(x + w, y + h - 45, 16, 30);

      // 7. Wings
      ctx.fillStyle = '#111';
      ctx.fillRect(x - 10, y + 5, w + 20, 10); // Front wing
      ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(x - 10, y + 5, w + 20, 2); // Wing highlight
      ctx.fillStyle = '#111';
      ctx.fillRect(x - 14, y + h - 18, w + 28, 14); // Rear wing

      // 8. Driver Cockpit
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(x + w/2, y + 40, 6, 0, Math.PI * 2); ctx.fill(); // Helmet
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath(); ctx.arc(x + w/2 - 2, y + 38, 2, 0, Math.PI * 2); ctx.fill(); // Visor glint
    };

    drawF1Car(game.player.x, game.player.y, currentTheme.color, true);
    game.obstacles.forEach(obs => drawF1Car(obs.x, obs.y, obs.color));

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameState === 'PLAYING') requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]);

  const move = (dir) => {
    if (gameState !== 'PLAYING') return;
    const newLane = Math.max(0, Math.min(2, lane + dir));
    setLane(newLane);
    gameRef.current.player.targetX = newLane * 100 + 40;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'PLAYING') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') move(-1);
      if (e.key === 'ArrowRight' || e.key === 'd') move(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, lane]);

  const startGame = () => {
    gameRef.current = { player: { x: 140, y: 500, targetX: 140, width: 50, height: 100 }, obstacles: [], speed: 10, distance: 0, frame: 0 };
    setLane(1); setScore(0); setGameState('PLAYING');
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#050505' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
          ELITE <span style={{ color: 'var(--color-accent)' }}>DRIVE</span>
        </h1>
      </header>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <div style={{ position: 'relative', width: '300px', height: '650px', background: '#0b0b0b', borderRadius: '30px', border: '3px solid #1a1a1a', overflow: 'hidden' }}>
          <canvas ref={canvasRef} width={300} height={650} style={{ width: '100%', height: '100%', display: 'block' }} />

          <AnimatePresence>
            {gameState === 'IDLE' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(20px)' }}>
                <Play size={60} style={{ marginBottom: '20px', cursor: 'pointer', color: 'var(--color-accent)' }} onClick={startGame} />
                <h2 style={{ color: '#fff', fontWeight: 900 }}>READY TO DRIVE?</h2>
              </motion.div>
            )}

            {gameState === 'GAMEOVER' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-accent)' }}>RETIRED</h2>
                <button onClick={startGame} style={{ marginTop: '30px', background: '#fff', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}>RESTART</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <StatBox label="DISTANCE" value={`${score} KM`} />
          <StatBox label="RECORD" value={`${highScore} KM`} color="var(--color-accent)" />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color = '#fff' }) {
  return (
    <div style={{ background: '#111', padding: '25px', borderRadius: '25px', border: '1px solid #222', minWidth: '180px' }}>
      <div style={{ fontSize: '0.6rem', fontWeight: 900, opacity: 0.4, marginBottom: '5px', letterSpacing: '0.1em' }}>{label}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
