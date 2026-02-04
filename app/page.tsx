import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Experience } from "./components/experience";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
