import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './features/hero/Hero';
import About from './features/about/About';
import Terminal from './features/terminal/Terminal';
import Skills from './features/skills/Skills';
import Experience from './features/experience/Experience';
import Projects from './features/projects/Projects';
import Education from './features/education/Education';
import Contact from './features/contact/Contact';

export default function App() {
    return (
        <>
            <ParticleBackground />
            <div className="circuit-pattern" />
            <Navbar />
            <main style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <div className="section-divider" />
                <About />
                <div className="section-divider" />
                <Terminal />
                <div className="section-divider" />
                <Skills />
                <div className="section-divider" />
                <Experience />
                <div className="section-divider" />
                <Projects />
                <div className="section-divider" />
                <Education />
                <div className="section-divider" />
                <Contact />
            </main>
        </>
    );
}
