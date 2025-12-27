'use client';

import React, { useState, useMemo } from 'react';
import NextImage from 'next/image';

type ProjectCategory = 'all' | 'web-development' | 'ai-ml' | 'automation' | 'cybersecurity' | 'birthday-gifts' | 'hackathons';

interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  link?: string;
  isVideo?: boolean;
  category: ProjectCategory[];
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { key: ProjectCategory; label: string; icon: string }[] = [
    { key: 'all', label: 'All Projects', icon: '🎯' },
    { key: 'web-development', label: 'Web Development', icon: '🌐' },
    { key: 'ai-ml', label: 'AI & ML', icon: '🤖' },
    { key: 'automation', label: 'Automation', icon: '⚙️' },
    { key: 'cybersecurity', label: 'Cybersecurity', icon: '🔐' },
    { key: 'birthday-gifts', label: 'Birthday Gifts', icon: '🎂' },
    { key: 'hackathons', label: 'Hackathons', icon: '🏆' },
  ];

  const projects: Project[] = [
    // --- FEATURED TOP 3 ---
    { title: 'Criminal Identification System', description: 'Criminal identification system using Python on 03/07/2024.', video: 'https://www.youtube.com/embed/0lMsasNGoFA?si=6MN3SDWZu9Xyq1TM', isVideo: true, category: ['ai-ml'] },
    { title: 'Library Management System', description: 'Library management system project on 10/06/2025.', video: 'https://www.youtube.com/embed/ULIltpxyJu0?si=ctn2WwGBxJP5Nmvo', isVideo: true, category: ['ai-ml', 'automation'] },
    { title: 'Encrypt Decrypt Project', description: 'Encryption/Decryption cybersecurity project on 23/06/2025.', image: '/assets/img/project5.png', link: 'https://project-5-encrypt-decrypt-project-w9hq.onrender.com/', category: ['cybersecurity'] },

    // --- OTHER PROJECTS ---
    // Web Development Projects
    { title: 'PUC College Website', description: 'This is the first website of my PU college, created in the year 2021–22.', image: '/assets/img/arshad786.42web.io.png', link: 'https://arshadpuc.netlify.app/', category: ['web-development'] },
    { title: 'My Personal Website', description: 'Personal website to store personal files, created in 2022.', image: '/assets/img/arshad65.42web.io.png', link: 'https://arshadold.netlify.app/', category: ['web-development'] },
    { title: 'Degree College Website V2', description: 'The 2nd website of my Seshadripuram Degree college, created in 2023.', image: '/assets/img/sdcvo.png', link: 'https://sdcarshad.netlify.app/', category: ['web-development'] },
    { title: 'Our Rashmi Mam', description: 'First client website for practicing, created in 2024.', image: '/assets/img/rashami.png', link: 'https://rashmiweb.netlify.app/', category: ['web-development'] },
    { title: 'Rashmi Mam V2 - Professional', description: 'Fully Professional, Responsive Website with Kannada Language Support.', image: '/assets/img/rashmi-newv2.png', link: 'https://rashmik.netlify.app/', category: ['web-development'] },
    { title: 'My Friend Website', description: 'First website gifted as a Birthday Gift on 06/03/2024.', image: '/assets/img/tfweb.png', link: 'https://tauqeerweb.netlify.app/', category: ['web-development', 'birthday-gifts'] },
    { title: 'Khazi Friend Website', description: 'Created on 03/07/2024.', image: '/assets/img/khazi.png', link: 'https://khazi.netlify.app/', category: ['web-development', 'birthday-gifts'] },
    { title: 'Project 0 - Library Management', description: 'Library management system project.', image: '/assets/img/project0.png', link: 'https://project0lms.netlify.app/', category: ['web-development'] },
    { title: 'Our Masjid Website', description: 'Community masjid website.', image: '/assets/img/masjid.png', link: 'https://arshadupcoming.netlify.app/', category: ['web-development'] },
    { title: 'Sandhya Birthday Gift', description: 'Birthday gift website for Library Mam on 21/9/24.', image: '/assets/img/httpssandhyaachari.netlify.app.png', link: 'https://sandhyaachari.netlify.app/', category: ['web-development', 'birthday-gifts'] },
    { title: '1st Professional Website', description: 'First professional client website.', image: '/assets/img/bharathi_mam_vap.png', link: 'https://bharathishankar.netlify.app/', category: ['web-development'] },
    { title: 'Full Animated Website', description: 'Fully animated website created on 20/1/25.', image: '/assets/img/p1.png', link: 'https://65project1.netlify.app/', category: ['web-development'] },
    { title: 'Advanced TODO List App', description: 'Advanced TODO app with localStorage on 29/6/25.', image: '/assets/img/todo.png', link: 'https://arshadtodoapp.netlify.app/', category: ['web-development'] },
    { title: 'QR Code Generator', description: 'QR Code generator with URL and Text on 5/06/25.', image: '/assets/img/qrcode.png', link: 'https://qr-code-website.onrender.com/', category: ['web-development'] },
    { title: 'Happy Birthday Gift Website', description: 'Birthday gift website for Lohit Sir.', image: '/assets/img/happy_website1.png', link: 'https://lohitsir.netlify.app/', category: ['web-development', 'birthday-gifts'] },
    { title: 'UI/UX to React Coding', description: 'Converting UI/UX design to ReactJS code.', image: '/assets/img/Uiuxtocode.png', link: 'https://ui-ux-degiin-to-codeing-5xa80ovk3.vercel.app/', category: ['web-development'] },
    { title: 'Next.js TODO App', description: 'TODO app built with ReactJS and Next.js.', image: '/assets/img/todolistnextjs.png', link: 'https://todo-app-with-react-js-and-next-js-chi.vercel.app/', category: ['web-development'] },
    { title: 'Company Website Redesign', description: 'Redesigned company website on 31/08/2025.', image: '/assets/img/rahul-class-Redigsied-Real_website.png', link: 'https://rahulsir-redesign-by-arshad.netlify.app/', category: ['web-development'] },
    { title: 'Think41 E-Commerce', description: 'E-Commerce website created for interview project.', image: '/assets/img/think41-e.png', link: 'https://think41-e-commerce.netlify.app/', category: ['web-development'] },
    { title: 'My First Game', description: 'First game created using Next.js.', image: '/assets/img/first-game.png', link: 'https://first-game-arshad-euge94wgj-arshad-pashas-projects-d7ff6964.vercel.app/', category: ['web-development'] },
    { title: 'Digital Art Sample Website', description: 'Sample digital art website with WhatsApp integration.', image: '/assets/img/digital-art.png', link: 'https://sample-digital-art.netlify.app/', category: ['web-development'] },
    { title: 'Myntra Clone', description: 'Myntra clone using JavaScript on 6/9/2025.', image: '/assets/img/myntra-clone.png', link: 'https://arshad-project11.netlify.app/', category: ['web-development'] },

    // AI/ML Projects (Remaining)
    { title: 'ElementMix - Chemical Simulator', description: 'Chemical reaction simulator ISRO project on 3/06/25.', image: '/assets/img/elementmix.png', link: 'https://elementmix-isro-project.onrender.com', category: ['ai-ml'] },
    { title: 'Image to Text Website', description: 'OCR-based image to text converter.', image: '/assets/img/project10.png', link: 'https://youtu.be/C-tSQfC5huw?si=loKCZs04CWpDi8z5', category: ['ai-ml'] },

    // Automation Projects (Remaining)
    { title: 'Pro 7 Automation Bot', description: 'Automation bot built in 2024.', video: 'https://www.youtube.com/embed/0J1fgZZZkXE?si=96MBmtZSkl6K9C7B', isVideo: true, category: ['automation'] },
    { title: 'Auto Excel Mail Project', description: 'Automated Excel email project in 2024.', video: 'https://www.youtube.com/embed/6-Sw3ylBdmo?si=oeuwNzhr8xH7vOvX', isVideo: true, category: ['automation'] },
    { title: 'Word Auto PDF Project', description: 'Automated Word to PDF conversion in 2024.', video: 'https://www.youtube.com/embed/SmrUFrmVXxo?si=mGnPHkdeSd0wjeK4', isVideo: true, category: ['automation'] },
    { title: 'ChatGPT Book Creator', description: 'Making book using ChatGPT in 2024.', video: 'https://www.youtube.com/embed/RRLkaKEX_sc?si=Qt7FuZ7l_1AeMbXV', isVideo: true, category: ['automation', 'ai-ml'] },
    { title: 'Data Entry UiPath Project', description: 'Advanced automation project with UiPath 2024/2025.', video: 'https://www.youtube.com/embed/MiwuCoPdHPU?si=FCmnvBhWaOC6flsJ', isVideo: true, category: ['automation'] },
    { title: 'KIOSK OS Library System', description: 'Real-time working system in college - 2025.', video: 'https://www.youtube.com/embed/ztMWIy6vX5k?si=ty4XuA4NLNhwNfVr', isVideo: true, category: ['automation'] },
    { title: 'Chrome Extension', description: 'Custom Chrome extension project.', image: '/assets/img/project9new.png', link: 'https://youtu.be/rNEbBEcnUtc?si=aT-Yzc_W2FbsVRoC', category: ['automation'] },

    // Hackathon Projects
    { title: 'Total Wellness Hackathon', description: 'First competition website at Hindustan College, Mysore on 22/03/2024.', image: '/assets/img/totalwellness.netlify.app.png', link: 'https://totalwellness.netlify.app/', category: ['hackathons', 'web-development'] },
    { title: 'Infosys Smart Recycling', description: 'Smart recycling solution at Infosys 48-hour hackathon on 11-12 July 2025.', image: '/assets/img/infosys_hackthon.png', link: 'https://smart-recyle.netlify.app/', category: ['hackathons', 'web-development'] },
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter(project => project.category.includes(activeCategory));
  }, [activeCategory]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3); // UPDATED: 6 -> 3

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gradient-start via-bg-secondary to-gradient-end py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <span className="text-accent-secondary">Featured</span> Projects
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Explore my collection of projects across various domains including web development, AI/ML, automation, and more.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setShowAll(false);
                }}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium
                  transition-all duration-300 border
                  ${activeCategory === cat.key
                    ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/30 scale-105'
                    : 'bg-card-bg text-text-secondary border-card-border hover:bg-card-bg-hover hover:text-text-primary hover:border-accent-primary/50'
                  }
                `}
                suppressHydrationWarning
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Project Count */}
          <div className="text-center mt-4">
            <span className="text-text-tertiary text-sm">
              Showing {displayedProjects.length} of {filteredProjects.length} projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-primary/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Project Media */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                {project.isVideo ? (
                  <div className="w-full h-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={project.video}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <>
                    <NextImage
                      src={project.image!}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(project)}
                          className="bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                          suppressHydrationWarning
                        >
                          View Details
                        </button>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent-secondary hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {project.category.slice(0, 2).map((cat, i) => (
                    <span
                      key={i}
                      className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                    >
                      {categories.find(c => c.key === cat)?.icon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                  {project.description || 'An exciting project showcasing creative development skills.'}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(project)}
                    className="flex-1 text-accent-primary hover:text-accent-hover font-medium text-sm flex items-center justify-center gap-2 py-2 border border-accent-primary/30 rounded-lg hover:bg-accent-primary/10 transition-all duration-300"
                    suppressHydrationWarning
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-accent-primary hover:bg-accent-hover text-white font-medium text-sm flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All / Show Less Button */}
        {filteredProjects.length > 3 && ( // UPDATED: 6 -> 3
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent-primary to-accent-hover hover:from-accent-hover hover:to-accent-primary text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-lg shadow-accent-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-primary/40"
              suppressHydrationWarning
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>View All {filteredProjects.length} Projects</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-bg-secondary border border-card-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              suppressHydrationWarning
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media */}
            <div className="relative h-64 sm:h-80 md:h-96">
              {selectedProject.isVideo ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedProject.video}
                  title={selectedProject.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <NextImage
                  src={selectedProject.image!}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.category.map((cat, i) => (
                  <span
                    key={i}
                    className="bg-accent-primary/20 text-accent-primary text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {categories.find(c => c.key === cat)?.icon} {categories.find(c => c.key === cat)?.label}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-text-secondary text-base sm:text-lg mb-6">
                {selectedProject.description || 'An exciting project showcasing creative development skills and innovative solutions.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Live Demo
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 bg-card-bg hover:bg-card-bg-hover text-text-primary border border-card-border px-6 py-3 rounded-full font-medium transition-all duration-300"
                  suppressHydrationWarning
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
