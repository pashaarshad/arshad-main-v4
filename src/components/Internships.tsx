'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Internship {
  filename: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  skills?: string[];
  isOngoing?: boolean;
}

const Internships = () => {
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<Internship | null>(null);
  const [pdfPreviews, setPdfPreviews] = useState<{ [key: string]: string }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pdfLibLoadedRef = useRef(false);

  const internships: Internship[] = [
    {
      filename: 'AICTE B1 PD Certificate-30.pdf',
      title: 'Cyber Security Internship',
      organization: 'AICTE & Edunet Foundation',
      date: 'June 2025',
      description: '6-week virtual internship program focused on Cyber Security fundamentals, threat analysis, and security best practices.',
      skills: ['Cyber Security', 'Threat Analysis', 'Network Security', 'Security Protocols']
    },
    {
      filename: 'Arshad  Pasha_AICTE_Certificate (3).pdf',
      title: 'AI and Data Analytics Internship',
      organization: 'AICTE, Shell India & Edunet Foundation',
      date: 'July - August 2025',
      description: '4-week intensive internship on AI & Data Analytics focused on Green Skills and sustainable technology solutions.',
      skills: ['AI', 'Data Analytics', 'Green Skills', 'Python']
    },
    {
      filename: 'Arshad  Pasha_AICTE_Certificate.pdf',
      title: 'AI and Data Analytics Program',
      organization: 'AICTE, Shell India & Edunet Foundation',
      date: 'June - July 2025',
      description: '4-week virtual internship under Skills4Future program focusing on artificial intelligence and data analytics.',
      skills: ['Machine Learning', 'Data Science', 'AI Fundamentals', 'Analytics']
    },
    {
      filename: 'Arshad Pasha __ID__ (1) (1).pdf',
      title: 'Full Stack Development Internship',
      organization: 'Micro IT',
      date: 'April 2025',
      description: '1-month comprehensive Full Stack Development certification program covering frontend, backend, and database technologies.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Full Stack']
    },
    {
      filename: 'Arshad Pasha_Completion_Certificate.pdf',
      title: 'Web Development Internship',
      organization: 'NexusLogic Technologies',
      date: 'March - May 2025',
      description: '2-month internship as Web Development Intern, building responsive web applications and learning modern web technologies.',
      skills: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Web Development']
    },
    {
      filename: 'Foundations of AI certificate.pdf',
      title: 'Foundations of Artificial Intelligence',
      organization: 'Microsoft, AICTE & Edunet Foundation',
      date: 'April - May 2025',
      description: '4-week Microsoft initiative internship program covering AI fundamentals, machine learning concepts, and practical applications.',
      skills: ['AI Foundations', 'Microsoft AI', 'Machine Learning', 'Deep Learning']
    },
    {
      filename: 'ThegoodgameTheory.pdf',
      title: 'Game Theory Research Internship',
      organization: 'The Good Game Theory',
      date: 'July 2025 - Ongoing',
      description: '6-month research internship focusing on game theory principles, strategic decision making, and practical applications.',
      skills: ['Game Theory', 'Research', 'Strategic Analysis', 'Decision Making'],
      isOngoing: true
    }
  ];

  // Load PDF.js library
  useEffect(() => {
    if (!pdfLibLoadedRef.current && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).pdfjsLib) {
          (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          pdfLibLoadedRef.current = true;
        }
      };
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set(prev).add(index));
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Load cached internship previews from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('internshipPreviewsCache');
        if (cached) {
          const parsedCache = JSON.parse(cached);
          // Check if cache is not too old (7 days)
          if (parsedCache.timestamp && Date.now() - parsedCache.timestamp < 7 * 24 * 60 * 60 * 1000) {
            setPdfPreviews(parsedCache.previews || {});
          }
        }
      } catch (e) {
        console.log('Cache read error:', e);
      }
    }
  }, []);

  // Save previews to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(pdfPreviews).length > 0) {
      try {
        const cacheData = {
          timestamp: Date.now(),
          previews: pdfPreviews
        };
        localStorage.setItem('internshipPreviewsCache', JSON.stringify(cacheData));
      } catch (e) {
        // localStorage might be full, clear old data
        try {
          localStorage.removeItem('internshipPreviewsCache');
        } catch { }
      }
    }
  }, [pdfPreviews]);

  const generatePdfPreview = useCallback(async (pdfUrl: string, key: string) => {
    if (pdfPreviews[key] || loadingStates[key]) return;
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    try {
      const pdfjsLib = (window as any).pdfjsLib;
      if (!pdfjsLib) {
        setLoadingStates(prev => ({ ...prev, [key]: false }));
        return;
      }
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
        disableAutoFetch: true,
        disableStream: true,
      });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      // Use smaller scale for faster rendering
      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { alpha: false });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      // Use lower quality for smaller file size and faster caching
      const imageUrl = canvas.toDataURL('image/jpeg', 0.5);
      setPdfPreviews(prev => ({ ...prev, [key]: imageUrl }));
      setLoadingStates(prev => ({ ...prev, [key]: false }));
      pdf.destroy();
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  }, [pdfPreviews, loadingStates]);

  const cardRef = useCallback((node: HTMLDivElement | null, index: number) => {
    if (node && observerRef.current) {
      node.setAttribute('data-index', index.toString());
      observerRef.current.observe(node);
    }
  }, []);

  const openModal = (path: string, internship: Internship) => {
    setSelectedInternship(path);
    setSelectedInfo(internship);
  };

  const closeModal = () => {
    setSelectedInternship(null);
    setSelectedInfo(null);
  };

  return (
    <section
      id="internships"
      className="min-h-screen bg-gradient-to-br from-gradient-start via-bg-secondary to-gradient-end py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <span className="text-accent-secondary">Internships</span> & Experience
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Professional internship programs and certifications demonstrating hands-on industry experience.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-xl p-4 text-center hover:bg-card-bg-hover transition-all duration-300">
            <div className="text-3xl font-bold text-accent-primary">{internships.length}</div>
            <div className="text-text-secondary text-sm">Total Internships</div>
          </div>
          <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-xl p-4 text-center hover:bg-card-bg-hover transition-all duration-300">
            <div className="text-3xl font-bold text-accent-secondary">{internships.filter(i => i.isOngoing).length}</div>
            <div className="text-text-secondary text-sm">Ongoing</div>
          </div>
          <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-xl p-4 text-center hover:bg-card-bg-hover transition-all duration-300">
            <div className="text-3xl font-bold text-green-500">{new Set(internships.map(i => i.organization)).size}</div>
            <div className="text-text-secondary text-sm">Organizations</div>
          </div>
          <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-xl p-4 text-center hover:bg-card-bg-hover transition-all duration-300">
            <div className="text-3xl font-bold text-purple-500">{new Set(internships.flatMap(i => i.skills || [])).size}+</div>
            <div className="text-text-secondary text-sm">Skills Gained</div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {internships.map((internship, index) => {
            const filePath = `/assets/intenships/${internship.filename}`;
            const previewKey = `internship-${index}`;
            const isVisible = visibleCards.has(index);

            if (typeof window !== 'undefined' && isVisible && !pdfPreviews[previewKey] && !loadingStates[previewKey] && pdfLibLoadedRef.current) {
              setTimeout(() => generatePdfPreview(filePath, previewKey), 50);
            }

            return (
              <div
                key={index}
                ref={(node) => cardRef(node, index)}
                className={`group bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-primary/10 transition-all duration-500 hover:-translate-y-2 hover-glow animate-fade-up`}
                style={{ animationDelay: `${index * 0.15}s` }}
                suppressHydrationWarning
              >
                {/* Certificate Preview */}
                <div
                  className="relative h-56 sm:h-64 overflow-hidden cursor-pointer"
                  onClick={() => openModal(filePath, internship)}
                >
                  {/* Ongoing Badge */}
                  {internship.isOngoing && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        Currently Active
                      </span>
                    </div>
                  )}

                  {!isVisible ? (
                    <div className="flex items-center justify-center h-full loading-placeholder">
                      <div className="text-center">
                        <div className="ring-loader mx-auto mb-3"></div>
                        <p className="text-text-secondary text-sm font-medium gradient-wave bg-clip-text text-transparent">Scroll to load...</p>
                      </div>
                    </div>
                  ) : loadingStates[previewKey] || !pdfPreviews[previewKey] ? (
                    <div className="flex items-center justify-center h-full loading-placeholder">
                      <div className="text-center">
                        <div className="dot-loader mx-auto mb-4">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <p className="text-text-secondary text-sm font-medium">Loading certificate...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={pdfPreviews[previewKey]}
                        alt={internship.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex gap-2">
                            <button
                              className="flex-1 bg-accent-primary hover:bg-accent-hover text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                              suppressHydrationWarning
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Certificate
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Internship Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1 flex-1">
                      {internship.title}
                    </h3>
                  </div>

                  <p className="text-accent-secondary font-semibold text-sm mb-2">
                    {internship.organization}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-text-tertiary text-sm">{internship.date}</span>
                  </div>

                  <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                    {internship.description}
                  </p>

                  {/* Skills Tags */}
                  {internship.skills && (
                    <div className="flex flex-wrap gap-1.5">
                      {internship.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="bg-accent-primary/10 text-accent-primary text-xs px-2.5 py-1 rounded-full font-medium border border-accent-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {internship.skills.length > 3 && (
                        <span className="text-text-tertiary text-xs py-1">
                          +{internship.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internship Modal */}
      {selectedInternship && selectedInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-bg-secondary border border-card-border rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-card-border bg-bg-tertiary/50 gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-text-primary mb-1">{selectedInfo.title}</h3>
                <p className="text-accent-secondary font-medium text-sm">{selectedInfo.organization}</p>
                <p className="text-text-tertiary text-sm flex items-center gap-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedInfo.date}
                  {selectedInfo.isOngoing && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                      Currently Active
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={selectedInternship}
                  download
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-hover text-white px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <a
                  href={selectedInternship}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-card-bg hover:bg-card-bg-hover text-text-primary border border-card-border px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open
                </a>
                <button
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0"
                  suppressHydrationWarning
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Description & Skills */}
            <div className="p-4 sm:p-6 border-b border-card-border bg-bg-secondary">
              <p className="text-text-secondary mb-4">{selectedInfo.description}</p>
              {selectedInfo.skills && (
                <div className="flex flex-wrap gap-2">
                  {selectedInfo.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-accent-primary/15 text-accent-primary text-sm px-3 py-1.5 rounded-full font-medium border border-accent-primary/25"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* PDF Viewer */}
            <div className="h-[60vh] overflow-auto">
              <iframe
                src={selectedInternship}
                className="w-full h-full"
                title="Internship Certificate"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Internships;
