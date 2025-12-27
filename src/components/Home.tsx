'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typed from 'typed.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import NextImage from 'next/image';
import 'swiper/css';


import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        socialRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.5'
      );

    // Typed.js animation
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          'Full Stack Developer',
          'Python Developer',
          'AI/ML Developer & Data Analyst',
          'ReactJS & JavaScript Developer',
          'C++ Programmer',
          'RPA Developer (Robotic Process Automation)',
          'Cybersecurity Learner',
          'Google Student Ambassador',
          'Motivational Speaker'
        ],
        typeSpeed: 100,
        backSpeed: 40,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-start via-bg-secondary to-gradient-end px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 pt-28"
      suppressHydrationWarning
    >
      {/* PixelBlast Background - Only on Desktop */}


      {/* Animated background elements */}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Meteor Shower */}
        <div className="meteor-shower-container">
          <div className="meteor meteor-1"></div>
          <div className="meteor meteor-2"></div>
          <div className="meteor meteor-3"></div>
          <div className="meteor meteor-4"></div>
          <div className="meteor meteor-5"></div>
          <div className="meteor meteor-6"></div>
          <div className="meteor meteor-7"></div>
          <div className="meteor meteor-8"></div>
          <div className="meteor meteor-9"></div>
          <div className="meteor meteor-10"></div>
          <div className="meteor meteor-11"></div>
          <div className="meteor meteor-12"></div>
          <div className="meteor meteor-13"></div>
          <div className="meteor meteor-14"></div>
          <div className="meteor meteor-15"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            >
              <span className="text-text-secondary">HI,</span><br />
              <span className="text-text-primary">I Am <span className="text-accent-secondary">Arshad Pasha</span></span><br />
              <span ref={typedRef} className="text-accent-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl"></span>
            </h1>

            {/* Social Links */}
            <div ref={socialRef} className="flex justify-center lg:justify-start gap-4 mb-8 flex-wrap">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arshad-pasha/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/+917760554350"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/arshadpasha65?igsh=MWs1YnQyOXdpZzd1eQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </a>

              {/* Resume/CV */}
              <a
                href="/assets/resume/MAIN Oct Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-110"
                aria-label="Resume"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/909/909212.png"
                  alt="Resume"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/pashaarshad"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                  alt="GitHub"
                  className="w-10 h-10 sm:w-12 sm:h-12 dark:filter dark:invert dark:brightness-200"
                />
              </a>
            </div>

            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-accent-primary to-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent-primary/50 text-sm sm:text-base"
              >
                View Projects
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-accent-secondary text-accent-secondary px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-accent-secondary hover:text-bg-primary transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={true}
              className="rounded-2xl shadow-2xl overflow-hidden"
            >
              <SwiperSlide>
                <div className="relative group overflow-hidden w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <NextImage
                    src="/arshad_home_good.jpg"
                    alt="Arshad Pasha - Infosys"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group overflow-hidden w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <NextImage
                    src="/arshad_sap_home.jpg"
                    alt="Arshad Pasha - SAP"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group overflow-hidden w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <NextImage
                    src="/arshad_infosysLogo.jpg"
                    alt="Arshad Pasha - SAP"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
