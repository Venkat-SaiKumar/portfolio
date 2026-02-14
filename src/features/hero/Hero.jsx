import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { profileData } from '../../data/profileData';
import HexagonPhoto from './HexagonPhoto';
import './Hero.css';

export default function Hero() {
    const typedText = useTypingEffect(profileData.personal.taglines);

    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <div className="hero-left">
                    <HexagonPhoto src={`${import.meta.env.BASE_URL}photo.png`} alt={profileData.personal.name} />
                </div>
                <div className="hero-right">
                    <div className="hero-greeting">
                        <span className="neon-text-green">{'>'}</span> Hello, I'm
                    </div>
                    <h1 className="hero-name shimmer-text">{profileData.personal.name}</h1>
                    <h2 className="hero-title">
                        <span className="neon-text-cyan">{profileData.personal.title}</span>
                    </h2>
                    <div className="hero-typing">
                        <span className="hero-typing-prefix">~/portfolio $</span>
                        <span className="hero-typing-text">{typedText}</span>
                        <span className="typing-cursor" />
                    </div>
                    <div className="hero-socials">
                        <a href={profileData.personal.github} target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                            <Github size={20} /> GitHub
                        </a>
                        <a href={profileData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                            <Linkedin size={20} /> LinkedIn
                        </a>
                        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.personal.email}`} target="_blank" rel="noopener noreferrer" className="hero-social-btn hero-social-primary">
                            <Mail size={20} /> Contact Me
                        </a>
                    </div>
                </div>
            </div>
            <div className="hero-scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                <ChevronDown size={24} className="float" />
            </div>
        </section>
    );
}
