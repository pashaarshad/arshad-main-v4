'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import NextImage from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(summaryRef.current, {
        scrollTrigger: {
          trigger: summaryRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.about-card');
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-start via-bg-secondary to-gradient-end py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-12 text-center"
        >
          About <span className="text-accent-secondary">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Side - Image Carousel */}
          <div className="relative order-2 lg:order-1">
            <Swiper
              modules={[Autoplay, EffectCube, Pagination, Navigation]}
              effect="cube"
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              loop={true}
              className="rounded-2xl shadow-2xl overflow-hidden about-swiper"
            >
              <SwiperSlide>
                <div className="relative group w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <NextImage
                    src="/arshad_about.jpg"
                    alt="Arshad Pasha - About"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <NextImage
                    src="/arshad_sap_about.jpg"
                    alt="Arshad Pasha - SAP"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                  <NextImage
                    src="/arshad_infosys_about.jpg"
                    alt="Arshad Pasha - Infosys"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Experience Badge - Bottom Right */}
            <div className="absolute bottom-[7%] -right-8 sm:-right-4 z-20 w-36 h-36 sm:w-48 sm:h-48">
              <div className="relative w-full h-full bg-white rounded-full shadow-2xl border-[3px] border-black">
                {/* Animated rotating circle with text */}
                <svg
                  className="w-full h-full animate-spin-slow"
                  viewBox="0 0 200 200"
                >
                  <defs>
                    <path
                      id="aboutExperienceCirclePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.15em]" fill="#000">
                    <textPath xlinkHref="#aboutExperienceCirclePath" startOffset="0%">
                      YEARS OF BEST AND SUCCESSFUL WORK EXPERIENCE •
                    </textPath>
                  </text>
                </svg>

                {/* Center content with 1 - image inside the number, with animated background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent experience-number-bg"
                    style={{
                      backgroundImage: 'url(/arshad_about.jpg)',
                      backgroundSize: '150px 150px',
                      backgroundPosition: 'center',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'contrast(1.1) brightness(0.9)',
                      fontFamily: '"Times New Roman", Times, serif',
                    }}
                  >
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Professional Summary */}
          <div
            ref={summaryRef}
            className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 sm:p-8 shadow-2xl transition-colors duration-300 order-1 lg:order-2 flex flex-col justify-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-accent-secondary mb-4 sm:mb-6">Professional Summary</h3>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Motivated Full Stack Web Developer with expertise in <span className="text-accent-primary font-semibold">Front-end</span> and <span className="text-accent-primary font-semibold">Back-end</span> development
              using ReactJS, NextJS, and MySQL, along with strong skills in Automation and cybersecurity.
              Experienced in delivering <span className="text-accent-secondary font-semibold">10+ real-world projects</span>, including UiPath-powered
              RPA workflows, expert use of GitHub and GitLab for version control, and secure applications with
              Encryption and Ethical hacking practices. Certified in <span className="text-green-500 font-semibold">Google Cloud</span>,
              <span className="text-green-500 font-semibold"> Infosys Springboard</span>, and <span className="text-green-500 font-semibold">Oracle Cloud</span>,
              with practical exposure to Vertex AI, API integration, and data-driven solutions.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education Card */}
          <div className="about-card bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-blue-500/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Education</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-blue-700 dark:text-blue-400">BCA - 9.2 CGPA</p>
                <p className="text-sm text-gray-800 dark:text-gray-300">Seshadripuram Degree College</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2023 - 2026</p>
              </div>
              <div>
                <p className="font-semibold text-blue-700 dark:text-blue-400">PU - 81.50%</p>
                <p className="text-sm text-gray-800 dark:text-gray-300">St. Joseph's Composite PU College</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2021 - 2023</p>
              </div>
            </div>
          </div>

          {/* Leadership Card */}
          <div className="about-card bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Leadership</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">★</span>
                <span className="text-gray-800 dark:text-gray-300">Education Vice-Captain – PU College</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">★</span>
                <span className="text-gray-800 dark:text-gray-300">Class Representative – Degree College</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">★</span>
                <span className="text-gray-800 dark:text-gray-300">Open-Source Contributor: SSOC</span>
              </li>
            </ul>
          </div>

          {/* Awards Card */}
          <div className="about-card bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-500/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Awards</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1">🏆</span>
                <span className="text-gray-800 dark:text-gray-300">1st Prize – Inter-College Website Development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">🏆</span>
                <span className="text-gray-800 dark:text-gray-300">2nd Prize – PU Level Web Development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">🏆</span>
                <span className="text-gray-800 dark:text-gray-300">Infosys Global Hackathon Participant</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
