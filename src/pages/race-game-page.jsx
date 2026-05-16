import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, RefreshCcw, Flag, Play } from 'lucide-react';
import { useThemeStore } from '../stores/theme-store.js';

// ============================================================
// F1 PITLANE ARCADE — High-Fidelity Mini-Game (Classic Dodge)
// ============================================================

export default function RaceGamePage() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const currentTheme = useThemeStore((s) => s.currentTheme);
  
  const requestRef = useRef();
  const gameRef = useRef({
    player: { x: 130, y: 500, targetX: 130, width: 40, height: 80 },
    obstacles: [],
    speed: 8,
    distance: 0,
    particles: [],
    frame: 0
  });

  // Game Loop
  const update = () => {
    if (gameState !== 'PLAYING') return;

    const game = gameRef.current;
    game.frame++;
    game.distance += game.speed / 10;
    setScore(Math.floor(game.distance));

    // Player smoothing
    game.player.x += (game.player.targetX - game.player.x) * 0.15;

    // Difficulty scaling
    game.speed = 8 + (game.distance / 100);

    // Spawn obstacles
    if (game.frame % Math.max(20, Math.floor(60 - game.speed)) === 0) {
      const lane = Math.floor(Math.random() * 3);
      game.obstacles.push({
        x: lane * 100 + 30,
        y: -100,
        width: 40,
        height: 80,
        color: ['#E8002D', '#3671C6', '#FF8000', '#00D2BE', '#006F62'][Math.floor(Math.random() * 5)]
      });
    }

    // Update obstacles
    game.obstacles.forEach((obs, index) => {
      obs.y += game.speed;
      
      // Collision Detection
      if (
        game.player.x < obs.x + obs.width &&
        game.player.x + game.player.width > obs.x &&
        game.player.y < obs.y + obs.height &&
        game.player.y + game.player.height > obs.y
      ) {
        setGameState('GAMEOVER');
      }

      if (obs.y > 800) game.obstacles.splice(index, 1);
    });

    // Drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Parallax City Background
    ctx.fillStyle = '#020205'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // City Lights/Buildings (Parallax)
    ctx.fillStyle = '#0A0A15';
    for(let i=0; i<6; i++) {
        const bx = (i * 60);
        const bh = 100 + Math.sin(game.frame * 0.01 + i) * 50;
        ctx.fillRect(bx, 0, 40, bh);
        ctx.fillStyle = game.frame % 50 < 25 ? '#F0F0F022' : '#F0F0F011';
        ctx.fillRect(bx + 10, 20, 5, 5);
        ctx.fillRect(bx + 25, 40, 5, 5);
        ctx.fillStyle = '#0A0A15';
    }

    // Camera Shake Logic
    const shakeX = (Math.random() - 0.5) * (game.speed - 8) * 0.5;
    const shakeY = (Math.random() - 0.5) * (game.speed - 8) * 0.5;
    ctx.save();
    ctx.translate(shakeX, shakeY);

    // 1. Wet Asphalt Base
    ctx.fillStyle = '#080808'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Wet Sheen (Reflections)
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for(let i=0; i<20; i++) {
        const ry = (game.frame * 20 + i * 100) % 800;
        ctx.fillRect(0, ry, canvas.width, 2);
    }

    // 2. Lane Markers
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.setLineDash([40, 60]);
    const lineOffset = (game.frame * game.speed) % 100;
    ctx.beginPath();
    ctx.moveTo(100, -100 + lineOffset); ctx.lineTo(100, 800 + lineOffset);
    ctx.moveTo(200, -100 + lineOffset); ctx.lineTo(200, 800 + lineOffset);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Side Scenery & Street Lamps
    const sceneryOffset = (game.frame * game.speed) % 200;
    for(let i=-1; i<5; i++) {
        const y = i * 200 + sceneryOffset;
        const gradient = ctx.createRadialGradient(15, y, 0, 15, y, 100);
        gradient.addColorStop(0, 'rgba(255, 220, 100, 0.15)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, y - 100, 50, 200);
        ctx.fillRect(250, y - 100, 50, 200);
    }

    // Helper: Draw F1 Car
    const drawF1Car = (x, y, color, isPlayer = false) => {
        const w = 40;
        const h = 80;

        // Headlights
        const lightGrad = ctx.createLinearGradient(x + w/2, y, x + w/2, y - 150);
        lightGrad.addColorStop(0, isPlayer ? `${color}33` : 'rgba(255,255,255,0.1)');
        lightGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.moveTo(x + 5, y);
        ctx.lineTo(x - 30, y - 150);
        ctx.lineTo(x + w + 30, y - 150);
        ctx.lineTo(x + w - 5, y);
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.beginPath();
        ctx.ellipse(x + w/2, y + h - 2, w/2 + 5, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        if (isPlayer && game.frame % 2 === 0) {
            game.particles.push({ x: x + w/2, y: y + h - 5, vy: 5, alpha: 1 });
        }

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(x + 12, y + 20, w - 24, 50); 
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + w/2 - 7, y + 5);
        ctx.lineTo(x + w/2 + 7, y + 5);
        ctx.lineTo(x + w/2 + 10, y + 35);
        ctx.lineTo(x + w/2 - 10, y + 35);
        ctx.fill();
        ctx.fillRect(x + 2, y + 30, w - 4, 15);
        
        ctx.fillStyle = '#111';
        ctx.fillRect(x - 5, y + 5, w + 10, 5); 
        ctx.fillRect(x - 8, y + h - 10, w + 16, 8); 
        ctx.fillStyle = '#050505';
        ctx.fillRect(x - 10, y + 15, 10, 20); ctx.fillRect(x + w, y + 15, 10, 20);
        ctx.fillRect(x - 12, y + h - 30, 12, 24); ctx.fillRect(x + w, y + h - 30, 12, 24);

        if (isPlayer) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.strokeStyle = color;
            ctx.strokeRect(x + 10, y + 25, w - 20, 40);
            ctx.shadowBlur = 0;
        }
    };

    game.particles.forEach((p, i) => {
        p.y += p.vy;
        p.alpha -= 0.05;
        if (p.alpha <= 0) game.particles.splice(i, 1);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.3})`;
        ctx.fillRect(p.x - 1, p.y, 2, 2);
    });

    drawF1Car(game.player.x, game.player.y, currentTheme.color, true);
    game.obstacles.forEach(obs => drawF1Car(obs.x, obs.y, obs.color, false));

    if (game.frame % 400 < 50) {
        const bridgeY = (game.frame % 400) * 16 - 200;
        ctx.fillStyle = '#111';
        ctx.fillRect(0, bridgeY, canvas.width, 100);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, bridgeY + 100, canvas.width, 20);
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for(let i=0; i<10; i++) {
        const rx = Math.random() * 300;
        const ry = Math.random() * 600;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 2, ry + 10);
        ctx.stroke();
    }

    ctx.restore(); 
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameState === 'PLAYING') requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]);

  const startGame = () => {
    gameRef.current = {
      player: { x: 130, y: 500, targetX: 130, width: 40, height: 80 },
      obstacles: [],
      speed: 8,
      distance: 0,
      particles: [],
      frame: 0
    };
    setScore(0);
    setGameState('PLAYING');
  };

  const handleKeyDown = (e) => {
    if (gameState !== 'PLAYING') return;
    if (e.key === 'ArrowLeft' || e.key === 'a') gameRef.current.player.targetX = Math.max(30, gameRef.current.player.targetX - 100);
    if (e.key === 'ArrowRight' || e.key === 'd') gameRef.current.player.targetX = Math.min(230, gameRef.current.player.targetX + 100);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score]);

  return (
    <div style={{
      minHeight: '100vh', paddingTop: '120px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', background: '#050505', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%)',
        pointerEvents: 'none', zIndex: 10
      }} />

      <header style={{ textAlign: 'center', marginBottom: '40px', zIndex: 1 }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 900, color: '#FFF',
          letterSpacing: '-0.04em', marginBottom: '8px', textTransform: 'uppercase'
        }}>
          STREET <span style={{ color: 'var(--color-accent)' }}>DRIVE</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em' }}>
          HYPER-REAL 2026 SIMULATION
        </p>
      </header>

      <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', zIndex: 1 }}>
        <div style={{
          position: 'relative', width: '300px', height: '600px', background: '#0b0b0b',
          borderRadius: '32px', border: '2px solid rgba(255,255,255,0.1)', overflow: 'hidden',
          boxShadow: '0 50px 120px rgba(0,0,0,1)'
        }}>
          <canvas ref={canvasRef} width={300} height={600} style={{ width: '100%', height: '100%', display: 'block' }} />

          <AnimatePresence>
            {gameState === 'IDLE' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(20px)', textAlign: 'center', padding: '20px'
                }}
              >
                <div style={{ 
                  width: '90px', height: '90px', borderRadius: '50%', background: 'var(--color-accent)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', cursor: 'pointer',
                  boxShadow: '0 0 50px var(--color-accent)', border: '6px solid rgba(255,255,255,0.1)'
                }} onClick={startGame}>
                  <Play size={40} color="#050505" fill="#050505" />
                </div>
                <h2 style={{ color: '#FFF', fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 900 }}>READY?</h2>
              </motion.div>
            )}

            {gameState === 'GAMEOVER' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)', color: '#FFF'
                }}
              >
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-accent)' }}>RETIRED</h2>
                <button onClick={startGame} style={{
                    marginTop: '40px', background: '#FFF', color: '#000', border: 'none', padding: '18px 40px',
                    borderRadius: '16px', fontWeight: 900, cursor: 'pointer', fontSize: '1rem'
                  }}
                >RE-ENGAGE</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <StatBox label="VELOCITY" value={`${Math.floor(gameRef.current.speed * 28)}`} unit="KM/H" icon={Zap} color="var(--color-accent)" />
          <StatBox label="DISTANCE" value={`${score}`} unit="M" icon={Flag} />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, icon: Icon, color = '#FFF' }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '32px', padding: '32px', minWidth: '280px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', opacity: 0.4 }}>
        <Icon size={16} />
        <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <div style={{ fontSize: '3rem', fontWeight: 900, color, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#444' }}>{unit}</div>
      </div>
    </div>
  );
}
