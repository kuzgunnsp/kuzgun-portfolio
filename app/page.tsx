import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CaseStudies from "../components/CaseStudies";
import Skills from "../components/Skills";
import Workflow from "../components/Workflow";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <CaseStudies />
        <Skills />
        <Workflow />
        <About />
        <Contact />
      </main>
    </>
  );
}
