'use client';

import React, { useState } from 'react';

interface Internship {
  id: string;
  filename?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  skills?: string[];
  isOngoing?: boolean;
  type: 'Work Experience' | 'Internship';
  location?: string;
}

const Internships = () => {
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<Internship | null>(null);

  const internships: Internship[] = [
    {
      id: 'exp-1',
      filename: 'ThegoodgameTheory.pdf',
      title: 'ReactJS Developer',
      organization: 'Antmore Labs Private Limited',
      date: 'July 2025 – Present',
      description: 'Worked with PhaserJS to develop interactive, game-like web interfaces for engaging user experiences. Independently used ReactJS and NextJS to enhance site responsiveness, functionality, and overall performance. Converted complete UI/UX designs into fully functional web pages using ReactJS, deploying them successfully in production.',
      skills: ['PhaserJS', 'ReactJS', 'Next.js', 'UI/UX Implementation', 'Web Performance'],
      isOngoing: true,
      type: 'Work Experience',
      location: 'Remote'
    },
    {
      id: 'int-1',
      filename: 'Arshad  Pasha_AICTE_Certificate (3).pdf',
      title: 'Artificial Intelligence and Data Analytics Intern',
      organization: 'AICTE, Shell India & Edunet Foundation',
      date: 'June 2025 - July 2025',
      description: 'Completed a 4-week virtual internship focused on AI, Data Analytics, and "Green Skills". Gained practical insights into sustainable technology solutions.',
      skills: ['AI', 'Data Analytics', 'Green Skills', 'Python'],
      type: 'Internship',
      location: 'Virtual'
    },
    {
      id: 'int-2',
      filename: 'AICTE B1 PD Certificate-30.pdf',
      title: 'Cyber Security Intern',
      organization: 'Edunet Foundation, AICTE, IBM SkillsBuild',
      date: 'Culminated June 2025',
      description: 'Focused on Cyber Security fundamentals, threat analysis, and security best practices. Learned to identify vulnerabilities and implement robust security protocols.',
      skills: ['Cyber Security', 'Threat Analysis', 'Network Security', 'IBM SkillsBuild'],
      type: 'Internship',
      location: 'Virtual'
    },
    {
      id: 'int-3',
      title: 'Data Analytics Job Simulation',
      organization: 'Deloitte Australia',
      date: 'June 2025',
      description: 'Completed a comprehensive virtual experience, gaining practical exposure to real-world data analytics challenges and visualization techniques.',
      skills: ['Data Analytics', 'Visualization', 'Problem Solving', 'Deloitte Virtual'],
      type: 'Internship',
      location: 'Virtual'
    },
    {
      id: 'int-4',
      title: 'Cybersecurity Virtual Experience Program',
      organization: 'Deloitte - Forage',
      date: 'June 2025',
      description: 'Gained hands-on experience in real-world cybersecurity scenarios and tasks, simulating the role of a cybersecurity analyst investigating incidents.',
      skills: ['Cybersecurity', 'Incident Response', 'Forensics', 'Forage'],
      type: 'Internship',
      location: 'Virtual'
    },
    {
      id: 'int-5',
      filename: 'Arshad Pasha_Completion_Certificate.pdf',
      title: 'Web Development Intern',
      organization: 'Nexus Logic Technologies',
      date: 'March 2025 - May 2025',
      description: 'Contributed to web development projects, demonstrating a strong understanding of modern web technologies and building responsive interfaces.',
      skills: ['Web Development', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
      type: 'Internship',
      location: 'Remote'
    },
    {
      id: 'int-6',
      filename: 'Foundations of AI certificate.pdf',
      title: 'Foundations of AI Intern',
      organization: 'Edunet Foundation - Microsoft Initiative',
      date: 'April 2025 - May 2025',
      description: 'Successfully completed a comprehensive program focused on the foundational principles and applications of Artificial Intelligence and Machine Learning.',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Microsoft AI', 'Foundations'],
      type: 'Internship',
      location: 'Virtual'
    },
    {
      id: 'int-7',
      filename: 'Arshad Pasha __ID__ (1) (1).pdf',
      title: 'Full Stack Development Intern',
      organization: 'Micro IT',
      date: 'April 2025 (1-Month Program)',
      description: 'Comprehensive Full Stack Development certification program covering frontend, backend, and database technologies. Built end-to-end web applications.',
      skills: ['Full Stack', 'React', 'Node.js', 'Database Management'],
      type: 'Internship',
      location: 'Remote'
    }
  ];

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
      className="min-h-screen bg-bg-primary py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary mb-6 tracking-tight font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Experience</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light leading-relaxed">
            My professional journey, internships, and certifications that have shaped my technical expertise.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary opacity-30 transform md:-translate-x-1/2 rounded-full"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {internships.map((internship, index) => {
              const filePath = internship.filename ? `/assets/intenships/${internship.filename}` : null;
              const isEven = index % 2 === 0;

              return (
                <div key={internship.id} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Timeline Dot */}
                  <div className={`absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-4 border-bg-primary z-20 transform -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${internship.type === 'Work Experience' ? 'bg-accent-secondary' : 'bg-accent-primary'}`}></div>

                  {/* Empty Space for alignment on Desktop */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Card */}
                  <div className="w-full md:w-5/12 pl-16 md:pl-0">
                    <div className={`group bg-card-bg backdrop-blur-md border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${internship.type === 'Work Experience' ? 'border-accent-secondary/30 shadow-accent-secondary/5' : 'border-card-border hover:border-accent-primary/30'}`}>

                      {/* Work Exp Highlight */}
                      {internship.type === 'Work Experience' && (
                        <div className="absolute top-0 right-0 px-3 py-1 bg-accent-secondary text-bg-primary text-xs font-bold rounded-bl-xl z-20">
                          WORK EXPERIENCE
                        </div>
                      )}

                      {/* Header Section */}
                      <div className="p-6 pb-2 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 mb-1">
                              {internship.title}
                            </h3>
                            <h4 className="text-accent-secondary font-semibold text-sm tracking-wide mb-1">
                              {internship.organization}
                            </h4>
                          </div>
                        </div>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-tertiary mb-3 font-mono">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {internship.date}
                          </div>
                          {internship.location && (
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {internship.location}
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {internship.description}
                        </p>

                        {/* Skills Tags */}
                        {internship.skills && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {internship.skills.slice(0, 4).map((skill, i) => (
                              <span
                                key={i}
                                className="bg-bg-tertiary/50 text-text-secondary text-[10px] px-2 py-0.5 rounded-full border border-card-border"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="px-6 py-4 bg-bg-tertiary/20 border-t border-card-border/50 flex items-center justify-between">
                        {/* View Certificate Button */}
                        {filePath ? (
                          <button
                            onClick={() => openModal(filePath, internship)}
                            className="inline-flex items-center gap-2 text-xs font-bold text-accent-primary hover:text-white hover:bg-accent-primary px-3 py-1.5 rounded-lg transition-all duration-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            View Certificate
                          </button>
                        ) : (
                          <span className="text-xs text-text-tertiary italic">Certificate not available</span>
                        )}

                        {/* Ongoing Badge */}
                        {internship.isOngoing && (
                          <span className="inline-flex items-center gap-1.5 text-green-500 text-xs font-bold">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            Present
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedInternship && selectedInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative bg-bg-secondary border border-card-border rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-card-border bg-bg-tertiary">
              <div>
                <h3 className="text-xl font-bold text-text-primary">{selectedInfo.title}</h3>
                <p className="text-accent-secondary text-sm">{selectedInfo.organization}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-secondary hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto bg-bg-primary p-1">
              <iframe
                src={selectedInternship}
                className="w-full h-full min-h-[60vh] rounded-lg"
                title="Certificate Preview"
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-card-border bg-bg-tertiary flex justify-end gap-3">
              <a
                href={selectedInternship}
                download
                className="px-4 py-2 bg-accent-primary text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Internships;
