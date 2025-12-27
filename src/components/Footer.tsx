'use client';

import React, { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate clock hands angles
  const getClockAngles = (date: Date) => {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;
    
    return { hourAngle, minuteAngle, secondAngle };
  };

  const clockAngles = currentTime ? getClockAngles(currentTime) : { hourAngle: 0, minuteAngle: 0, secondAngle: 0 };

  return (
    <footer className="relative overflow-hidden transition-colors duration-300" suppressHydrationWarning>
      {/* Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Top Quote Section */}
      <div className="relative border-b border-blue-700/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-blue-100">
            <span className="text-cyan-400 font-semibold">&ldquo;Technology</span> is the bridge between{' '}
            <span className="text-yellow-400 font-semibold">dreams</span> and{' '}
            <span className="text-cyan-400 font-semibold">reality</span>&rdquo;
          </p>
          <p className="text-sm text-blue-300 mt-2 italic">— Building Tomorrow, Today</p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          
          {/* Left Side - Analog Clock */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            {/* Analog Clock */}
            {mounted && (
              <div className="relative w-32 h-32 mb-4">
                {/* Clock outer glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                
                {/* Clock face */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-blue-500/50 shadow-2xl flex items-center justify-center">
                  {/* Clock markers */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-blue-400"
                      style={{
                        transform: `rotate(${i * 30}deg) translateY(-52px)`,
                        transformOrigin: 'center center',
                      }}
                    ></div>
                  ))}
                  
                  {/* Hour hand */}
                  <div
                    className="absolute w-1.5 h-8 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-full origin-bottom"
                    style={{
                      transform: `rotate(${clockAngles.hourAngle}deg)`,
                      bottom: '50%',
                    }}
                  ></div>
                  
                  {/* Minute hand */}
                  <div
                    className="absolute w-1 h-11 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-full origin-bottom"
                    style={{
                      transform: `rotate(${clockAngles.minuteAngle}deg)`,
                      bottom: '50%',
                    }}
                  ></div>
                  
                  {/* Second hand */}
                  <div
                    className="absolute w-0.5 h-12 bg-yellow-400 rounded-full origin-bottom"
                    style={{
                      transform: `rotate(${clockAngles.secondAngle}deg)`,
                      bottom: '50%',
                    }}
                  ></div>
                  
                  {/* Center dot */}
                  <div className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                </div>
              </div>
            )}
            
            <p className="text-2xl font-bold text-white font-mono tracking-wider">
              {currentTime ? formatTime(currentTime) : '--:-- --'}
            </p>
            <p className="text-xs text-blue-300 mt-1">
              {currentTime ? formatDate(currentTime) : '---'}
            </p>
            
            {/* Motivational Quote */}
            <p className="mt-4 text-yellow-400 font-bold italic text-sm">
              &ldquo;I Can and I Will&rdquo;
            </p>
          </div>

          {/* Center - Quick Links with Animation */}
          <div className="text-center">
            <p className="text-xs text-blue-300 uppercase tracking-[0.3em] mb-6">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((link, index) => (
                <a 
                  key={link}
                  href={`#${link.toLowerCase()}`} 
                  className="group relative px-5 py-2.5 text-sm font-semibold text-blue-100 uppercase tracking-wider overflow-hidden rounded-xl transition-all duration-500 hover:text-white hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glowing border */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"></span>
                  <span className="absolute inset-[2px] rounded-xl bg-slate-900/90 group-hover:bg-slate-800/90 transition-colors duration-300"></span>
                  {/* Animated gradient background on hover */}
                  <span className="absolute inset-[2px] rounded-xl bg-gradient-to-r from-cyan-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-cyan-600/40 group-hover:via-blue-600/40 group-hover:to-purple-600/40 transition-all duration-500"></span>
                  {/* Top shine effect */}
                  <span className="absolute inset-x-[2px] top-[2px] h-[50%] rounded-t-xl bg-gradient-to-b from-white/10 to-transparent"></span>
                  {/* Shimmer sweep effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></span>
                  {/* Text */}
                  <span className="relative z-10 drop-shadow-sm">{link}</span>
                </a>
              ))}
            </div>
            
            {/* Social Links with glow effect */}
            <div className="flex justify-center gap-5 mb-6">
              {[
                { href: 'https://www.linkedin.com/in/arshad-pasha/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: 'hover:text-blue-400 hover:shadow-blue-500/50' },
                { href: 'https://github.com/pashaarshad', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z', color: 'hover:text-purple-400 hover:shadow-purple-500/50' },
                { href: 'https://www.instagram.com/arshadpasha65', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', color: 'hover:text-pink-400 hover:shadow-pink-500/50' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-blue-300 transition-all duration-300 hover:scale-125 hover:shadow-lg ${social.color} p-2 rounded-full`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d={social.icon} clipRule="evenodd"/></svg>
                </a>
              ))}
              <a 
                href="mailto:arshadpashaintern@gmail.com" 
                className="text-blue-300 transition-all duration-300 hover:scale-125 hover:text-red-400 hover:shadow-lg hover:shadow-red-500/50 p-2 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
            
            {/* Visitor Counter */}
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Counter container */}
              <div className="relative px-6 py-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-xl border border-blue-500/30 shadow-2xl">
                {/* Top shine */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                
                <p className="text-[10px] text-blue-300 uppercase tracking-[0.25em] mb-2 text-center font-medium">Visitors</p>
                
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <img 
                    src="https://hitwebcounter.com/counter/counter.php?page=10964565&style=0006&nbdigits=5&type=page&initCount=0"
                    title="Visitor Counter" 
                    alt="Visit counter" 
                    className="inline-block"
                  />
                </div>
                
                {/* Bottom shine */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Logo with spinning animation */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            {/* Logo with spinning ring */}
            <div className="relative w-40 h-40 mb-4">
              {/* Outer spinning ring - multicolor */}
              <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ animationDuration: '8s' }}>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="25%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="75%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" fill="none" stroke="url(#gradient1)" strokeWidth="3" strokeDasharray="20 10" />
                </svg>
              </div>
              
              {/* Inner spinning ring - reverse */}
              <div className="absolute inset-2 rounded-full animate-spin-slow-reverse" style={{ animationDuration: '6s' }}>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="15 8" />
                </svg>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
              
              {/* Logo */}
              <div className="absolute inset-4 flex items-center justify-center">
                <img 
                  src="/ap_logo.png" 
                  alt="Arshad Pasha Logo" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">ARSHAD PASHA</span>
            </h3>
            <p className="text-sm text-blue-300 mt-1">Full Stack Developer</p>
            <p className="text-xs text-blue-400">AI/ML Enthusiast • Tech Innovator</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative border-t border-blue-700/50 py-4 bg-blue-950/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-blue-300">
            Copyright © {currentYear} <span className="text-cyan-400 font-medium">Arshad Pasha</span>. All rights reserved.
          </p>
          <p className="text-xs text-blue-400 flex items-center gap-1">
            Built with <span className="text-cyan-400 font-medium">Next.js</span> <span className="text-red-500 animate-pulse">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
