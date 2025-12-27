'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import NextImage from 'next/image';

type CertificateCategory = 'all' | 'professional' | 'courses' | 'hackathons' | 'college' | 'other';

interface Certificate {
  filename: string;
  title: string;
  description?: string;
  folder: string;
  category: CertificateCategory;
  organization?: string;
}

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('all');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [pdfPreviews, setPdfPreviews] = useState<{ [key: string]: string }>({});
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pdfLibLoadedRef = useRef(false);

  const categories: { key: CertificateCategory; label: string; icon: string; color: string }[] = [
    { key: 'all', label: 'All Certificates', icon: '📜', color: 'from-blue-500 to-purple-500' },
    { key: 'professional', label: 'Professional', icon: '🏆', color: 'from-yellow-500 to-orange-500' },
    { key: 'courses', label: 'Courses', icon: '📚', color: 'from-green-500 to-teal-500' },
    { key: 'hackathons', label: 'Hackathons', icon: '💻', color: 'from-purple-500 to-pink-500' },
    { key: 'college', label: 'Academic', icon: '🎓', color: 'from-blue-500 to-cyan-500' },
    { key: 'other', label: 'Awards & Competitions', icon: '🥇', color: 'from-red-500 to-orange-500' },
  ];

  const certificates: Certificate[] = [
    // Professional Certifications
    { filename: 'AI Foundations Associate.pdf', title: 'AI Foundations Associate', folder: 'main_professional_certifications', category: 'professional', organization: 'Oracle' },
    { filename: 'Data Science Professional.pdf', title: 'Data Science Professional', folder: 'main_professional_certifications', category: 'professional', organization: 'Oracle' },
    { filename: 'Generative AI Professional_arshad.pdf', title: 'Generative AI Professional', folder: 'main_professional_certifications', category: 'professional', organization: 'Oracle' },

    // Course Certifications
    { filename: 'Agile Scrum in Practice.pdf', title: 'Agile Scrum in Practice', folder: 'Cources', category: 'courses', description: 'Professional development course' },
    { filename: 'Introduction to Artificial Intelligence.pdf', title: 'Introduction to Artificial Intelligence', folder: 'Cources', category: 'courses', description: 'AI fundamentals course' },
    { filename: 'Introduction to Data Science.pdf', title: 'Introduction to Data Science', folder: 'Cources', category: 'courses', description: 'Data Science basics' },
    { filename: 'OpenAI Generative Pre-trained Transformer 3 (GPT-3) for developers.pdf', title: 'GPT-3 for Developers', folder: 'Cources', category: 'courses', description: 'OpenAI GPT-3 development course' },
    { filename: 'photo_1_2025-09-09_23-04-19.jpg', title: 'Course Certificate 1', folder: 'Cources', category: 'courses' },
    { filename: 'photo_2_2025-09-09_23-04-19.jpg', title: 'Course Certificate 2', folder: 'Cources', category: 'courses' },
    { filename: '1-5fa0208d-f0b5-4247-ab58-2f5f0d9aa895.pdf', title: 'Online Course Certificate', folder: 'Cources', category: 'courses' },
    { filename: '1-92b0c280-65cc-4d41-8dd9-a58dd785278d.pdf', title: 'Professional Course Certificate', folder: 'Cources', category: 'courses' },
    { filename: '1-a45203d8-42a8-4be4-a6f3-445c419e3b3e.pdf', title: 'Technical Course Certificate', folder: 'Cources', category: 'courses' },

    // Hackathon Certificates
    { filename: 'photo_5_2025-09-09_23-04-19.jpg', title: 'Hackathon Achievement 1', folder: 'Hackthons', category: 'hackathons', description: 'Programming competition' },
    { filename: 'photo_6_2025-09-09_23-04-19.jpg', title: 'Hackathon Achievement 2', folder: 'Hackthons', category: 'hackathons', description: 'Coding challenge' },
    { filename: 'photo_7_2025-09-09_23-04-19.jpg', title: 'Hackathon Achievement 3', folder: 'Hackthons', category: 'hackathons', description: 'Tech competition' },
    { filename: 'photo_8_2025-09-09_23-04-19.jpg', title: 'Hackathon Achievement 4', folder: 'Hackthons', category: 'hackathons', description: 'Innovation challenge' },
    { filename: 'photo_10_2025-09-09_23-04-19.jpg', title: 'Hackathon Achievement 5', folder: 'Hackthons', category: 'hackathons', description: 'Development marathon' },

    // College/Academic Certificates
    { filename: 'photo_13_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 1', folder: 'College', category: 'college' },
    { filename: 'photo_14_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 2', folder: 'College', category: 'college' },
    { filename: 'photo_15_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 3', folder: 'College', category: 'college' },
    { filename: 'photo_16_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 4', folder: 'College', category: 'college' },
    { filename: 'photo_17_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 5', folder: 'College', category: 'college' },
    { filename: 'photo_18_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 6', folder: 'College', category: 'college' },
    { filename: 'photo_19_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 7', folder: 'College', category: 'college' },
    { filename: 'photo_20_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 8', folder: 'College', category: 'college' },
    { filename: 'photo_21_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 9', folder: 'College', category: 'college' },
    { filename: 'photo_22_2025-09-09_23-04-19.jpg', title: 'Academic Achievement 10', folder: 'College', category: 'college' },

    // Other/Awards & Competitions
    { filename: 'RBI Quize.jpg', title: 'RBI Quiz Certificate', folder: 'Other', category: 'other', description: 'State level competition' },
    { filename: 'Eassy English.jpg', title: 'Essay Competition Certificate', folder: 'Other', category: 'other', description: 'English essay competition' },
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
            const key = entry.target.getAttribute('data-cert-key');
            if (key) {
              setVisibleCards(prev => new Set(prev).add(key));
            }
          }
        });
      },
      { rootMargin: '150px', threshold: 0.1 }
    );
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Load cached previews from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('pdfPreviewsCache');
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
        localStorage.setItem('pdfPreviewsCache', JSON.stringify(cacheData));
      } catch (e) {
        // localStorage might be full, clear old data
        try {
          localStorage.removeItem('pdfPreviewsCache');
        } catch { }
      }
    }
  }, [pdfPreviews]);

  const generatePdfPreview = useCallback(async (pdfUrl: string, key: string) => {
    if (pdfPreviews[key]) return;
    try {
      const pdfjsLib = (window as any).pdfjsLib;
      if (!pdfjsLib) return;
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
      pdf.destroy();
    } catch (error) {
      console.error('Error generating PDF preview:', error);
    }
  }, [pdfPreviews]);

  const cardRef = useCallback((node: HTMLDivElement | null, key: string) => {
    if (node && observerRef.current) {
      node.setAttribute('data-cert-key', key);
      observerRef.current.observe(node);
    }
  }, []);

  const filteredCertificates = useMemo(() => {
    if (activeCategory === 'all') return certificates;
    return certificates.filter(cert => cert.category === activeCategory);
  }, [activeCategory]);

  const displayedCertificates = showAll ? filteredCertificates : filteredCertificates.slice(0, 6);

  const openModal = (path: string) => setSelectedCert(path);
  const closeModal = () => setSelectedCert(null);

  const getCategoryColor = (category: CertificateCategory) => {
    return categories.find(c => c.key === category)?.color || 'from-gray-500 to-gray-600';
  };

  return (
    <section
      id="certificates"
      className="min-h-screen bg-gradient-to-br from-gradient-start via-bg-secondary to-gradient-end py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <span className="text-accent-secondary">Certificates</span> & Achievements
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Professional certifications, course completions, and academic achievements showcasing continuous learning.
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
                    ? 'bg-accent-secondary text-black border-accent-secondary shadow-lg shadow-accent-secondary/30 scale-105'
                    : 'bg-card-bg text-text-secondary border-card-border hover:bg-card-bg-hover hover:text-text-primary hover:border-accent-secondary/50'
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

          <div className="text-center mt-4">
            <span className="text-text-tertiary text-sm">
              Showing {displayedCertificates.length} of {filteredCertificates.length} certificates
            </span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayedCertificates.map((cert, index) => {
            const filePath = `/assets/certificates/${cert.folder}/${cert.filename}`;
            const isPDF = cert.filename.toLowerCase().endsWith('.pdf');
            const previewKey = `cert-${cert.folder}-${index}`;
            const isVisible = visibleCards.has(previewKey);

            if (isPDF && typeof window !== 'undefined' && isVisible && !pdfPreviews[previewKey] && pdfLibLoadedRef.current) {
              setTimeout(() => generatePdfPreview(filePath, previewKey), 50);
            }

            return (
              <div
                key={index}
                ref={(node) => cardRef(node, previewKey)}
                className={`group bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-secondary/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer hover-glow animate-fade-up stagger-${(index % 6) + 1}`}
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
                onClick={() => openModal(filePath)}
                suppressHydrationWarning
              >
                {/* Certificate Preview */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  {/* Category Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(cert.category)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                  {isPDF ? (
                    !isVisible ? (
                      <div className="flex items-center justify-center h-full loading-placeholder">
                        <div className="text-center">
                          <div className="ring-loader mx-auto mb-3"></div>
                          <p className="text-text-secondary text-sm font-medium gradient-wave bg-clip-text text-transparent">Scroll to load...</p>
                        </div>
                      </div>
                    ) : pdfPreviews[previewKey] ? (
                      <img
                        src={pdfPreviews[previewKey]}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full loading-placeholder">
                        <div className="text-center">
                          <div className="dot-loader mx-auto mb-4">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <p className="text-text-secondary text-sm font-medium">Loading preview...</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <NextImage
                      src={filePath}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button
                      className="bg-accent-secondary hover:bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                      suppressHydrationWarning
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Certificate
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`bg-gradient-to-r ${getCategoryColor(cert.category)} text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg`}>
                      {categories.find(c => c.key === cert.category)?.icon} {categories.find(c => c.key === cert.category)?.label}
                    </span>
                  </div>

                  {/* File Type Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`${isPDF ? 'bg-red-500' : 'bg-green-500'} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                      {isPDF ? 'PDF' : 'IMG'}
                    </span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-accent-secondary transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                  {cert.organization && (
                    <p className="text-accent-primary text-sm font-medium mb-1">
                      {cert.organization}
                    </p>
                  )}
                  {cert.description && (
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {filteredCertificates.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent-secondary to-yellow-400 hover:from-yellow-400 hover:to-accent-secondary text-black px-8 py-3.5 rounded-full font-semibold text-base shadow-lg shadow-accent-secondary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
                  <span>View All {filteredCertificates.length} Certificates</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-bg-secondary border border-card-border rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Actions */}
            <div className="flex items-center justify-between p-4 border-b border-card-border bg-bg-tertiary/50">
              <h3 className="text-lg font-semibold text-text-primary">Certificate Viewer</h3>
              <div className="flex items-center gap-2">
                <a
                  href={selectedCert}
                  download
                  className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <a
                  href={selectedCert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-card-bg hover:bg-card-bg-hover text-text-primary border border-card-border px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open New Tab
                </a>
                <button
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  suppressHydrationWarning
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="h-[80vh] overflow-auto">
              {selectedCert.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={selectedCert}
                  className="w-full h-full"
                  title="Certificate PDF"
                />
              ) : (
                <div className="flex items-center justify-center p-4 min-h-full">
                  <NextImage
                    src={selectedCert}
                    alt="Certificate"
                    width={900}
                    height={650}
                    className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
