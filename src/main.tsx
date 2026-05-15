import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';

gsap.registerPlugin(ScrollTrigger, Flip);

if (import.meta.env.DEV) {
  (window as Window & { gsap?: typeof gsap }).gsap = gsap;
}

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found');
}

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
