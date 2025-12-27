'use client';

import React, { useState, useEffect } from 'react';

// Success Popup Component
const SuccessPopup = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[300px] max-w-[400px]">
        {/* Animated Checkmark */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-success-bounce">
            <svg 
              className="w-7 h-7 text-white animate-checkmark" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
                className="animate-draw-check"
              />
            </svg>
          </div>
          {/* Ripple Effect */}
          <div className="absolute inset-0 w-12 h-12 bg-white/30 rounded-full animate-ping-once"></div>
        </div>
        
        {/* Message */}
        <div className="flex-1">
          <h4 className="font-bold text-lg">Message Sent!</h4>
          <p className="text-white/90 text-sm">Your form has been submitted successfully.</p>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-white animate-progress-shrink rounded-full"></div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      access_key: "45f83e32-5806-4fe1-b89b-3d6803f0a353",
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: "New Contact Form Submission from Portfolio",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <>
      {/* Success Popup */}
      <SuccessPopup isVisible={showSuccess} onClose={() => setShowSuccess(false)} />
      
      <section 
        id="contact" 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-start via-bg-secondary to-gradient-end py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
        suppressHydrationWarning
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-8 sm:mb-12 text-center">
            <span className="text-accent-secondary">Get In</span> Touch
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Contact Form */}
            <div className="bg-card-bg backdrop-blur-sm border border-card-border p-6 sm:p-8 rounded-xl shadow-2xl" suppressHydrationWarning>
              <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                <div suppressHydrationWarning>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-semibold text-text-secondary mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    suppressHydrationWarning
                    className="w-full px-3 py-2.5 bg-bg-tertiary border border-border-primary text-text-primary rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all text-sm placeholder-text-tertiary"
                    placeholder="Your Name"
                  />
                </div>
                <div suppressHydrationWarning>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold text-text-secondary mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    suppressHydrationWarning
                    className="w-full px-3 py-2.5 bg-bg-tertiary border border-border-primary text-text-primary rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all text-sm placeholder-text-tertiary"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div suppressHydrationWarning>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-semibold text-text-secondary mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-3 py-2.5 bg-bg-tertiary border border-border-primary text-text-primary rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all resize-none text-sm placeholder-text-tertiary"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="w-full bg-gradient-to-r from-accent-primary to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-accent-hover hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] text-sm shadow-lg hover:shadow-accent-primary/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
              
              {/* Social Links */}
              <div className="mt-6 pt-5 border-t border-border-primary">
                <p className="text-center text-text-tertiary mb-3 text-sm">Or connect with me on</p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/arshadpasha" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-accent-primary transition-all transform hover:scale-110 duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/pashaarshad" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-accent-secondary transition-all transform hover:scale-110 duration-300"
                    aria-label="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://arshadpasha.tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-accent-primary transition-all transform hover:scale-110 duration-300"
                    aria-label="Website"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Image */}
            <div className="hidden md:flex items-center justify-center">
              <img 
                src="/contact_us.png" 
                alt="Contact Us" 
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
