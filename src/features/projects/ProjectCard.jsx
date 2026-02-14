import { ExternalLink } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ name, description, tech, link }) {
    return (
        <div className="project-card glow-card">
            <div className="project-card-top">
                <h3 className="project-card-name">{name}</h3>
                {link && link !== '#' && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                        <ExternalLink size={16} />
                    </a>
                )}
            </div>
            <p className="project-card-desc">{description}</p>
            <div className="project-card-tech">
                {tech.map((t, i) => (
                    <span key={i} className="skill-tag">{t}</span>
                ))}
            </div>
        </div>
    );
}
