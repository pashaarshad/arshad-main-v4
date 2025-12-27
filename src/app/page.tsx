import Navbar from "@/components/nav";
import Home from "@/components/Home";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Internships from "@/components/Internships";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Internships />
      <Contact />
      <Footer />
    </div>
  );
}
