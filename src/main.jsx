import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router.jsx';

gsap.registerPlugin(ScrollTrigger, Flip);

if (import.meta.env.DEV) {
  window.gsap = gsap;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
