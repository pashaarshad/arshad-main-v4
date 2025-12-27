'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sunRef.current || !moonRef.current) return;

    if (theme === 'dark') {
      gsap.to(sunRef.current, {
        opacity: 0,
        rotate: 180,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(moonRef.current, {
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(sunRef.current, {
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(moonRef.current, {
        opacity: 0,
        rotate: -180,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [theme]);

  const handleClick = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
    toggleTheme();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="relative w-12 h-12 rounded-full bg-nav-bg border border-nav-border shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {/* Sun Icon */}
      <svg
        ref={sunRef}
        className="absolute w-6 h-6 text-accent-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ opacity: theme === 'light' ? 1 : 0 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon */}
      <svg
        ref={moonRef}
        className="absolute w-6 h-6 text-accent-secondary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ opacity: theme === 'dark' ? 1 : 0 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
