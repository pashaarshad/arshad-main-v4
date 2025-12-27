'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import PixelEffect from './PixelEffect';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Internships', href: '#internships' },
    { name: 'Contact', href: '#contact' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    e.preventDefault();
    setActiveIndex(index);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    // Initial load animation
    const logo = logoRef.current;
    const navItemsDiv = navItemsRef.current;

    if (logo) {
      gsap.set(logo, { scale: 0 });
      gsap.to(logo, {
        scale: 1,
        duration: 0.6,
        ease: 'power3.easeOut'
      });
    }

    if (navItemsDiv) {
      gsap.set(navItemsDiv, { width: 0, overflow: 'hidden' });
      gsap.to(navItemsDiv, {
        width: 'auto',
        duration: 0.6,
        ease: 'power3.easeOut'
      });
    }

    // Intersection Observer to detect active section
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const index = navItems.findIndex(item => item.href === `#${sectionId}`);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach(item => {
      const sectionId = item.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  const handleEnter = (i: number) => {
    setHoveredIndex(i);
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    setHoveredIndex(null);
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.5,
      ease: 'power2.easeOut',
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 8, duration: 0.3, ease: 'power3.easeOut' });
        gsap.to(lines[1], { opacity: 0, duration: 0.2, ease: 'power3.easeOut' });
        gsap.to(lines[2], { rotation: -45, y: -8, duration: 0.3, ease: 'power3.easeOut' });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power3.easeOut' });
        gsap.to(lines[1], { opacity: 1, duration: 0.2, ease: 'power3.easeOut' });
        gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3, ease: 'power3.easeOut' });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.easeOut'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: 'power3.easeOut',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full px-4 py-4 transition-colors duration-300">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-2 nav-gradient backdrop-blur-md border border-nav-border rounded-full shadow-2xl transition-colors duration-300">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home', 0)}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
          className="inline-flex items-center justify-center overflow-visible w-[64px] h-[64px] hover:scale-110 transition-transform"
        >
          <Image 
            src="/ap_logo.png" 
            alt="Logo" 
            width={64} 
            height={64} 
            ref={logoImgRef}
            className="w-full h-full object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div
          ref={navItemsRef}
          className="relative items-center hidden md:flex"
        >
          <ul className="list-none flex items-stretch m-0 h-full gap-6">
            {navItems.map((item, i) => {
              const isActive = activeIndex === i;

              return (
                <li key={item.href} className="flex h-full items-center">
                  <a
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href, i)}
                    className={`relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] leading-[0] uppercase tracking-[0.8px] whitespace-nowrap cursor-pointer px-5 py-2 transition-colors duration-300 ${
                      isActive 
                        ? 'bg-nav-active-bg text-accent-secondary' 
                        : 'bg-transparent text-nav-text hover:bg-nav-active-bg hover:text-nav-text-hover'
                    }`}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {/* Pixel Effect Canvas - Always active for current section */}
                    <PixelEffect 
                      isActive={isActive || hoveredIndex === i}
                      gap={3}
                      speed={isActive ? 40 : 60}
                      colors={isActive ? "#fbbf24,#f59e0b,#d97706" : "#3b82f6,#60a5fa,#93c5fd"}
                    />
                    <span
                      className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-accent-primary"
                      style={{ willChange: 'transform' }}
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="relative inline-block leading-[1] z-[2]">
                      <span
                        className={`pill-label relative z-[2] inline-block leading-[1] ${
                          isActive ? 'text-accent-secondary font-bold' : ''
                        }`}
                        style={{ willChange: 'transform' }}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`pill-label-hover absolute left-0 top-0 z-[3] inline-block ${
                          isActive ? 'text-accent-secondary' : 'text-nav-text-hover'
                        }`}
                        style={{ willChange: 'transform, opacity' }}
                        aria-hidden="true"
                      >
                        {item.name}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-2 h-2 rounded-full z-[4] bg-accent-secondary animate-pulse"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Theme Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden rounded-full flex flex-col items-center justify-center gap-1.5 cursor-pointer p-0 bg-nav-active-bg w-[48px] h-[48px] shadow-lg border border-nav-border"
          >
            <span className="hamburger-line w-5 h-0.5 rounded origin-center bg-nav-text" />
            <span className="hamburger-line w-5 h-0.5 rounded origin-center bg-nav-text" />
            <span className="hamburger-line w-5 h-0.5 rounded origin-center bg-nav-text" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[80px] left-4 right-4 rounded-2xl shadow-2xl nav-gradient backdrop-blur-lg origin-top border border-nav-border"
      >
        <ul className="list-none m-0 p-2 flex flex-col gap-1">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  handleScroll(e, item.href, index);
                  toggleMobileMenu();
                }}
                className="block py-3 px-5 text-base font-semibold rounded-full bg-nav-active-bg text-nav-text hover:bg-card-bg-hover hover:text-nav-text-hover transition-all duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
