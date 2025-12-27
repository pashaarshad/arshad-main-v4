import type { Metadata } from "next";
import { Poppins, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userObfuscation: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://arshadpasha.com'),
  title: {
    default: "Arshad Pasha | Full Stack Developer & AI/ML Engineer in Mysore, India",
    template: "%s | Arshad Pasha - Full Stack Developer"
  },
  description: "Arshad Pasha - Professional Full Stack Web Developer & AI/ML Engineer based in Mysore, India. Expert in ReactJS, Next.js, Python, Node.js, TypeScript, and Machine Learning. Available for freelance projects and collaborations.",
  keywords: [
    "Arshad Pasha",
    "Arshad Masar",
    "Full Stack Developer",
    "Full Stack Web Developer",
    "AI ML Developer",
    "AI Developer Mysore",
    "ML Engineer India",
    "Web Developer Mysore",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Freelance Developer India",
    "JavaScript Developer",
    "TypeScript Developer",
    "Machine Learning Engineer",
    "Data Science",
    "Cyber Security",
    "UiPath Developer",
    "Automation Developer",
    "Portfolio Website",
    "Seshadripuram Degree College",
    "Mysore Developer",
    "Karnataka Developer",
    "India Developer"
  ],
  authors: [{ name: "Arshad Pasha", url: "https://arshadpasha.com" }],
  creator: "Arshad Pasha",
  publisher: "Arshad Pasha",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://arshadpasha.com",
    siteName: "Arshad Pasha Portfolio",
    title: "Arshad Pasha | Full Stack Developer & AI/ML Engineer",
    description: "Professional Full Stack Web Developer & AI/ML Engineer based in Mysore, India. Expert in ReactJS, Next.js, Python, and Machine Learning. View my projects, certifications, and experience.",
    images: [
      {
        url: "/assets/img/arshad.jpg",
        width: 1200,
        height: 630,
        alt: "Arshad Pasha - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshad Pasha | Full Stack Developer & AI/ML Engineer",
    description: "Professional Full Stack Web Developer & AI/ML Engineer based in Mysore, India. Expert in ReactJS, Next.js, Python, and Machine Learning.",
    images: ["/assets/img/arshad.jpg"],
    creator: "@arshadpasha",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://arshadpasha.com",
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/assets/img/aplogo.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/img/aplogo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/assets/img/aplogo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/assets/img/aplogo.png",
  },
  manifest: "/manifest.json",
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arshad Pasha",
  alternateName: "Arshad Masar",
  url: "https://arshadpasha.com",
  image: "https://arshadpasha.com/assets/img/arshad.jpg",
  jobTitle: "Full Stack Developer & AI/ML Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mysore",
    addressRegion: "Karnataka",
    addressCountry: "India"
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Seshadripuram Degree College"
  },
  knowsAbout: [
    "Full Stack Development",
    "Web Development",
    "React.js",
    "Next.js",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",
    "UiPath Automation",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
    "Git",
    "GitHub"
  ],
  sameAs: [
    "https://github.com/arshadpasha",
    "https://linkedin.com/in/arshadpasha",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Theme initialization - detects system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme) {
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                }
              } catch (e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${orbitron.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
