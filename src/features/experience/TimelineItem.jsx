import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './TimelineItem.css';

export default function TimelineItem({ role, company, location, period, projects }) {
    const [expanded, setExpanded] = useState(null);

    return (
        <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
                <div className="timeline-header">
                    <h3 className="timeline-role">{role}</h3>
                    <span className="timeline-period">{period}</span>
                </div>
                <p className="timeline-company">{company} • {location}</p>

                <div className="timeline-projects">
                    {projects.map((project, i) => (
                        <div key={i} className="timeline-project">
                            <button
                                className="timeline-project-toggle"
                                onClick={() => setExpanded(expanded === i ? null : i)}
                            >
                                <span className="neon-text-green">▸</span> {project.name}
                                {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {expanded === i && (
                                <div className="timeline-project-details">
                                    <p className="timeline-project-desc">{project.description}</p>
                                    <ul className="timeline-project-highlights">
                                        {project.highlights.map((h, j) => (
                                            <li key={j}>{h}</li>
                                        ))}
                                    </ul>
                                    <div className="timeline-project-tech">
                                        {project.tech.map((t, j) => (
                                            <span key={j} className="skill-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
