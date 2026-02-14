import { Terminal } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Navbar.css';

const sections = ['hero', 'about', 'terminal', 'skills', 'experience', 'projects', 'education', 'contact'];
const labels = { hero: 'home', about: 'about', terminal: 'terminal', skills: 'skills', experience: 'experience', projects: 'projects', education: 'education', contact: 'contact' };

export default function Navbar() {
    const activeSection = useScrollSpy(sections);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="navbar-brand" onClick={() => scrollTo('hero')}>
                    <Terminal size={20} className="navbar-icon" />
                    <span className="navbar-name">venkat<span className="neon-text-green">sai</span>@portfolio</span>
                </div>
                <div className="navbar-links">
                    {sections.filter(s => s !== 'hero').map(id => (
                        <button
                            key={id}
                            className={`navbar-link ${activeSection === id ? 'active' : ''}`}
                            onClick={() => scrollTo(id)}
                        >
                            <span className="navbar-prompt">{'>'}</span> {labels[id]}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
