'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface InteractiveSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
}

const InteractiveSlider: React.FC<InteractiveSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
  label = 'Slide Me'
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setValue(clampedValue);
    if (onChange) onChange(clampedValue);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        scale: 1.3,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const newValue = min + percentage * (max - min);
    handleValueChange(Math.round(newValue / step) * step);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, min, max, step]);

  useEffect(() => {
    // Animate dots on value change
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('.slider-dot');
      const percentage = ((value - min) / (max - min)) * 100;
      
      dots.forEach((dot, index) => {
        const dotPercentage = (index / (dots.length - 1)) * 100;
        if (dotPercentage <= percentage) {
          gsap.to(dot, {
            scale: 1.2,
            backgroundColor: 'var(--accent-secondary)',
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: 'var(--border-primary)',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [value, min, max]);

  const percentage = ((value - min) / (max - min)) * 100;
  const numberOfDots = 11;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-4 text-center">
        <span className="text-lg font-semibold text-text-primary">{label}</span>
        <div className="text-3xl font-bold text-accent-primary mt-2">{value}</div>
      </div>

      <div
        ref={sliderRef}
        className="relative w-full h-16 flex items-center cursor-pointer group"
        onMouseDown={handleMouseDown}
      >
        {/* Background Track */}
        <div className="absolute w-full h-5 bg-gradient-to-r from-bg-tertiary via-border-primary to-bg-tertiary rounded-full shadow-inner border border-border-primary">
          {/* Active Track */}
          <div
            ref={trackRef}
            className="absolute h-full rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary transition-all duration-200 shadow-lg"
            style={{ width: `${percentage}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Dots */}
        <div ref={dotsRef} className="absolute w-full flex justify-between px-1 pointer-events-none">
          {Array.from({ length: numberOfDots }).map((_, index) => (
            <div
              key={index}
              className="slider-dot w-3 h-3 rounded-full bg-border-primary shadow-md transition-all duration-300"
            />
          ))}
        </div>

        {/* Thumb */}
        <div
          ref={thumbRef}
          className="absolute w-12 h-12 -ml-6 bg-white dark:bg-gradient-to-br dark:from-accent-primary dark:to-accent-secondary rounded-full shadow-2xl border-4 border-accent-primary cursor-grab active:cursor-grabbing z-10 flex items-center justify-center group-hover:shadow-accent-primary/50 transition-all duration-300"
          style={{ left: `${percentage}%` }}
        >
          {/* Inner circle */}
          <div className="w-6 h-6 bg-gradient-to-br from-accent-secondary to-accent-primary rounded-full animate-pulse"></div>
          
          {/* Ripple effect */}
          {isDragging && (
            <div className="absolute inset-0 rounded-full border-4 border-accent-primary animate-ping opacity-75"></div>
          )}
        </div>
      </div>

      {/* Value markers */}
      <div className="flex justify-between mt-4 px-2 text-sm text-text-tertiary">
        <span className="font-medium">{min}</span>
        <span className="font-medium">{max}</span>
      </div>
    </div>
  );
};

export default InteractiveSlider;
