import { useCallback, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './navbar.jsx';
import { NewsMarquee } from './news-marquee.jsx';
import { IgnitionScreen } from '../ui/ignition-screen.jsx';
import { CountdownDock } from '../ui/countdown-dock.jsx';

const pageEase = [0.25, 0.46, 0.45, 0.94];

export default function RootLayout() {
  const location = useLocation();
  const [ignitionDone, setIgnitionDone] = useState(false);

  const handleIgnitionComplete = useCallback(() => {
    setIgnitionDone(true);
  }, []);

  return (
    <>
      {!ignitionDone && <IgnitionScreen onComplete={handleIgnitionComplete} />}
      <div
        className={`relative flex min-h-screen flex-col transition-all duration-500 ease-out ${
          ignitionDone ? 'scale-100 opacity-100' : 'pointer-events-none scale-[0.98] opacity-0'
        }`}
      >
        <Navbar />
        <main className="relative flex-1 pb-24 pt-6 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: pageEase }}
              className="mx-auto w-full max-w-6xl px-4 md:px-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <NewsMarquee />
        <CountdownDock />
      </div>
    </>
  );
}
