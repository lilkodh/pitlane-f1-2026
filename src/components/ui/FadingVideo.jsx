import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from '../../lib/cn';

const CROSSFADE_SEC = 0.55;

/**
 * Broadcast-style background: seamless loops without a hard cut.
 * - **mp4Src**: dual stacked `<video>` layers with rAF crossfade before each loop end.
 * - **hlsSrc**: single stream via hls.js; light opacity dip on restart when `ended` fires.
 */
export function FadingVideo({ mp4Src, hlsSrc, className, overlayClassName }) {
  if (hlsSrc) {
    return <HlsBackground src={hlsSrc} className={className} overlayClassName={overlayClassName} />;
  }
  if (mp4Src) {
    return <Mp4DualCrossfade src={mp4Src} className={className} overlayClassName={overlayClassName} />;
  }
  return null;
}

function Mp4DualCrossfade({ src, className, overlayClassName }) {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const activeRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b || !src) return undefined;

    a.src = src;
    b.src = src;
    for (const el of [a, b]) {
      el.muted = true;
      el.playsInline = true;
      el.setAttribute('playsinline', '');
      el.preload = 'auto';
    }

    const beginPlayback = () => {
      activeRef.current = 0;
      a.style.opacity = '1';
      b.style.opacity = '0';
      b.pause();
      b.currentTime = 0;
      void a.play().catch(() => {});
    };

    const onLoadedMeta = () => {
      cancelAnimationFrame(rafRef.current);
      const tick = () => {
        const cur = activeRef.current === 0 ? a : b;
        const nxt = activeRef.current === 0 ? b : a;
        const d = cur.duration;
        if (!d || !Number.isFinite(d) || d <= 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        const remain = d - cur.currentTime;
        if (remain < CROSSFADE_SEC && !cur.paused) {
          if (nxt.paused) {
            nxt.currentTime = 0;
            void nxt.play().catch(() => {});
          }
          const t = (CROSSFADE_SEC - remain) / CROSSFADE_SEC;
          const blend = Math.min(1, Math.max(0, t));
          cur.style.opacity = String(1 - blend);
          nxt.style.opacity = String(blend);
          if (blend >= 0.99) {
            cur.pause();
            cur.currentTime = 0;
            cur.style.opacity = '0';
            nxt.style.opacity = '1';
            activeRef.current = activeRef.current === 0 ? 1 : 0;
          }
        } else {
          cur.style.opacity = '1';
          if (nxt.paused) nxt.style.opacity = '0';
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    a.addEventListener('loadedmetadata', onLoadedMeta);
    a.addEventListener('canplay', beginPlayback, { once: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      a.removeEventListener('loadedmetadata', onLoadedMeta);
      a.removeEventListener('canplay', beginPlayback);
      a.removeAttribute('src');
      b.removeAttribute('src');
      a.load();
      b.load();
    };
  }, [src]);

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <video ref={aRef} className="absolute inset-0 h-full w-full scale-105 object-cover" aria-hidden />
      <video ref={bRef} className="absolute inset-0 h-full w-full scale-105 object-cover" aria-hidden />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b from-carbon via-carbon/70 to-carbon',
          overlayClassName
        )}
      />
    </div>
  );
}

function HlsBackground({ src, className, overlayClassName }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return undefined;

    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 30, enableWorker: true });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      void video.play().catch(() => {});
    }

    const onEnded = () => {
      video.style.opacity = '0.88';
      requestAnimationFrame(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
        video.style.opacity = '1';
      });
    };
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('ended', onEnded);
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src]);

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-300"
        muted
        playsInline
        autoPlay
        aria-hidden
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b from-carbon via-carbon/75 to-carbon',
          overlayClassName
        )}
      />
    </div>
  );
}
