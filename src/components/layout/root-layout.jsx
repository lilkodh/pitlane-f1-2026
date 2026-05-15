import { useCallback, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './navbar.jsx';
import { NewsMarquee } from './news-marquee.jsx';
import { IgnitionScreen } from '../ui/ignition-screen.jsx';
import { CountdownDock } from '../ui/countdown-dock.jsx';

/** Stitch / broadcast: sharp, sporty easing */
const pageEase = [0.25, 0.46, 0.45, 0.94];

const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: pageEase },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.28, ease: pageEase },
  },
};

/** In dev, skip ignition so the UI (and HMR) is visible immediately unless VITE_DEV_IGNITION=1 */
function initialIgnitionDone() {
  if (!import.meta.env.DEV) return false;
  return import.meta.env.VITE_DEV_IGNITION !== '1';
}

export default function RootLayout() {
  const location = useLocation();
  const [ignitionDone, setIgnitionDone] = useState(initialIgnitionDone);

  const handleIgnitionComplete = useCallback(() => {
    setIgnitionDone(true);
  }, []);

  return (
    <>
      {!ignitionDone && <IgnitionScreen onComplete={handleIgnitionComplete} />}
      <motion.div
        className={`relative flex min-h-screen flex-col ${
          ignitionDone ? '' : 'pointer-events-none opacity-0'
        }`}
        initial={false}
        animate={
          ignitionDone
            ? { scale: 1, opacity: 1, transition: { duration: 0.55, ease: pageEase } }
            : { scale: 0.98, opacity: 0 }
        }
      >
        <Navbar />
        <main className="relative flex-1 pb-24 pt-6 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mx-auto w-full max-w-pit px-4 md:px-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <NewsMarquee />
        <CountdownDock />
      </motion.div>
    </>
  );
}
