import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CaseStudies from "../components/CaseStudies";
import Skills from "../components/Skills";
import Workflow from "../components/Workflow";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Playground from "../components/Playground";
import Contact from "../components/Contact";
import SectionDivider from "../components/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <SectionDivider label="PORTFOLIO_NAV: PROJECTS" status="ACTIVE" buildCode="SYS.OK" />
        <CaseStudies />
        <SectionDivider label="PORTFOLIO_NAV: SKILLS" status="READY" buildCode="SYS.OK" />
        <Skills />
        <SectionDivider label="PORTFOLIO_NAV: WORKFLOW" status="READY" buildCode="SYS.OK" />
        <Workflow />
        <SectionDivider label="PORTFOLIO_NAV: ABOUT" status="DECRYPTED" buildCode="SYS.OK" />
        <About />
        <SectionDivider label="PORTFOLIO_NAV: TESTIMONIALS" status="VERIFIED" buildCode="SYS.OK" />
        <Testimonials />
        <SectionDivider label="PORTFOLIO_NAV: PLAYGROUND" status="EXPERIMENTAL" buildCode="SYS.OK" />
        <Playground />
        <SectionDivider label="PORTFOLIO_NAV: CONTACT" status="SECURE" buildCode="SYS.OK" />
        <Contact />
      </main>
    </>
  );
}

