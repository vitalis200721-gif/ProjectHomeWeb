"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSession } from "next-auth/react";

type VideoBackgroundProps = {
  src: string; // e.g. "/media/hero.mp4"
  poster: string; // e.g. "/media/img-061.jpg"
  parallaxY: any; // MotionValue<string> | string
  parallaxScale: any; // MotionValue<number> | number
  dim?: number; // 0..1
};

function VideoBackground({ src, poster, parallaxY, parallaxScale, dim = 0.25 }: VideoBackgroundProps) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Try to start playback on mount (fixes "shows only after navigation")
    const tryPlay = async () => {
      try {
        await v.play();
        setVideoReady(true);
      } catch {
        // Autoplay might be blocked — poster stays visible, user interaction later will start it
      }
    };

    tryPlay();
  }, [src]);

  return (
    <div className="absolute inset-0">
      <motion.div className="absolute inset-0" style={{ y: parallaxY, scale: parallaxScale }}>
        <Image src={poster} alt="Hero background" fill priority className="object-cover object-center" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY, scale: parallaxScale, opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${dim})` }} />
    </div>
  );
}


function CinematicOverlays({
  glowOpacity,
  vignetteOpacity,
}: {
  glowOpacity: any; // MotionValue<number> | number
  vignetteOpacity: any; // MotionValue<number> | number
}) {
  return (
    <>
      {/* Glow / bloom */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.06) 28%, transparent 60%)",
        }}
      />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* Vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.80) 100%)",
        }}
      />
    </>
  );
}

function FeaturePill({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-4 py-3">
      <div className="text-white font-semibold text-sm">{title}</div>
      <div className="text-white/70 text-xs">{subtitle}</div>
    </div>
  );
}

function LeftContent({
  primaryHref,
  primaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <div className="max-w-3xl">
      <motion.p
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm text-white/90 backdrop-blur"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
        Atrium Studio • Cinematic Home Experiences
      </motion.p>

      <motion.h1
        className="mt-6 text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.22 }}
      >
        Cinematic homes,
        <span className="block text-white/90">tailored to you.</span>
      </motion.h1>

      <motion.p
        className="mt-6 text-base sm:text-lg md:text-xl max-w-2xl text-white/80"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.38 }}
      >
        Explore modern architecture & interiors with a premium feel. Find your
        next home style, compare projects, and save inspiration—built for speed
        and clarity.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.55 }}
      >
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm sm:text-base font-semibold
                 bg-white text-black hover:bg-white/90 transition relative"
        >
          <span className="relative z-10">{primaryLabel}</span>
        </Link>

        <Link
          href="/finder"
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm sm:text-base font-semibold
                 border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/15 transition relative"
        >
          <span className="relative z-10">Try Property Finder</span>
        </Link>

        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm sm:text-base font-semibold
                 border border-white/20 bg-black/30 text-white/90 backdrop-blur hover:bg-black/40 transition relative"
        >
          <span className="relative z-10">See Pricing →</span>
        </Link>
      </motion.div>

      <motion.div
        className="mt-10 grid grid-cols-3 gap-3 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.78 }}
      >
        <FeaturePill
          title="Premium craft"
          subtitle="Architecture + Interiors"
        />
        <FeaturePill title="Sustainable" subtitle="Materials & systems" />
        <FeaturePill title="Cinematic" subtitle="Light, mood, story" />
      </motion.div>

      <motion.div
        className="mt-8 text-xs text-white/55 flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.95 }}
      >
        <span>• Fast Next.js UI</span>
        <span>• Google login + Prisma</span>
        <span>• SEO ready (sitemap/robots)</span>
      </motion.div>
    </div>
  );
}

function MiniChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function RightPanel({
  progressScaleX,
  primaryHref,
  primaryLabel,
}: {
  progressScaleX: any; // MotionValue<number>
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-white/15 bg-black/35 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-white font-semibold">Live Preview</div>
              <div className="text-xs text-white/55 mt-1">
                Cinematic UI • Responsive
              </div>
            </div>
            <div className="text-xs text-white/55">Modern UI • Responsive</div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/60">Recommended</div>
            <div className="mt-1 text-white font-semibold text-lg">
              Minimal Warm Modern
            </div>
            <div className="mt-1 text-sm text-white/70">
              Clean lines, warm accents, soft lighting.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <MiniChip>Gallery</MiniChip>
              <MiniChip>Services</MiniChip>
              <MiniChip>Finder</MiniChip>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/60">Auth</div>
              <div className="mt-1 text-white font-semibold">
                Google + Credentials
              </div>
              <div className="mt-1 text-sm text-white/70">
                Secure routes, clean UX.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/60">Performance</div>
              <div className="mt-1 text-white font-semibold">Smooth & fast</div>
              <div className="mt-1 text-sm text-white/70">
                Optimized layout & styles.
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs text-white/60">Next step</div>
            <div className="mt-1 text-white font-semibold">
              Browse projects → save favourites → refine search
            </div>

            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/60"
                style={{ scaleX: progressScaleX, transformOrigin: "0% 50%" }}
              />
            </div>
            <div className="mt-2 text-xs text-white/55">
              cinematic parallax progress
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold
                     bg-white text-black hover:bg-white/90 transition"
            >
              {primaryLabel}
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold
                     border border-white/20 bg-black/30 text-white/90 hover:bg-black/40 transition backdrop-blur"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* soft border highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
    </div>
  );
}

export function HeroUltra() {
  const { data: session } = useSession();
  const reduceMotion = useReducedMotion();

  const runwayRef = useRef<HTMLDivElement | null>(null);

  // Only animate after mount to avoid hydration weirdness
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();

  const [range, setRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  useEffect(() => {
    const compute = () => {
      const el = runwayRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const docTop = window.scrollY + rect.top;
      const h = el.offsetHeight;

      const stickyH = window.innerHeight * 0.86;
      const start = docTop;
      const end = docTop + Math.max(1, h - stickyH);

      setRange({ start, end });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const localProgress = useTransform(scrollY, (y) => {
    if (!range) return 0;
    const { start, end } = range;
    if (end <= start) return 0;

    const p = (y - start) / (end - start);
    if (!Number.isFinite(p)) return 0;
    return Math.min(1, Math.max(0, p));
  });

  const smooth = useSpring(mounted ? localProgress : 0, {
    stiffness: 140,
    damping: 24,
  });

  const bgScale = useTransform(smooth, [0, 1], [1.03, 1.12]);
  const bgY = useTransform(smooth, [0, 1], ["0%", "10%"]);

  const glowOpacity = useTransform(smooth, [0, 0.55, 1], [0.35, 0.8, 0.55]);
  const vignetteOpacity = useTransform(smooth, [0, 1], [0.5, 0.75]);

  const leftY = useTransform(smooth, [0, 1], ["0px", "-18px"]);
  const rightY = useTransform(smooth, [0, 1], ["0px", "-12px"]);
  const panelRotate = useTransform(smooth, [0, 1], [0, -1.2]);

  const hintOpacity = useTransform(smooth, [0, 0.25, 1], [1, 0.6, 0]);

  const primaryHref = session?.user ? "/dashboard" : "/projects";
  const primaryLabel = session?.user ? "Go to Dashboard" : "Explore Projects";

  const parallaxY = reduceMotion ? "0%" : bgY;
  const parallaxScale = reduceMotion ? 1 : bgScale;

  return (
    <section ref={runwayRef} className="relative w-full">
      <div className="relative h-[140vh]">
        <div className="sticky top-0 h-[78vh] md:h-[86vh] overflow-hidden">
          <VideoBackground
            src="/media/hero.mp4"
            poster="/media/img-061.jpg"
            parallaxY={parallaxY}
            parallaxScale={parallaxScale}
            dim={0.22}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/65" />
          <CinematicOverlays
            glowOpacity={mounted ? glowOpacity : 0.6}
            vignetteOpacity={mounted ? vignetteOpacity : 0.65}
          />

          <div className="relative z-10 h-full">
            <div className="max-w-7xl mx-auto px-4 h-full">
              <div className="h-full flex items-center">
                <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <motion.div
                    className="lg:col-span-7"
                    style={{ y: reduceMotion ? 0 : leftY }}
                  >
                    <LeftContent
                      primaryHref={primaryHref}
                      primaryLabel={primaryLabel}
                    />
                  </motion.div>

                  <motion.div
                    className="lg:col-span-5"
                    style={{
                      y: reduceMotion ? 0 : rightY,
                      rotate: reduceMotion ? 0 : panelRotate,
                      transformOrigin: "50% 50%",
                    }}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 }}
                  >
                    <RightPanel
                      progressScaleX={smooth}
                      primaryHref={primaryHref}
                      primaryLabel={primaryLabel}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950/70 to-transparent" />

          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center"
            style={{ opacity: hintOpacity }}
          >
            <div className="rounded-full border border-white/15 bg-black/30 backdrop-blur px-4 py-2 text-xs text-white/70">
              Scroll to feel the parallax ↓
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[54vh] pointer-events-none" />
      </div>

      <div className="h-10 md:h-14" />
    </section>
  );
}
