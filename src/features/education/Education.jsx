import { GraduationCap, BookOpen } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import { profileData } from '../../data/profileData';
import './Education.css';

export default function Education() {
    return (
        <section id="education" className="section">
            <SectionTitle title="education" subtitle="Academic background & research" />

            <div className="education-grid">
                <div className="education-card glow-card">
                    <div className="education-card-icon">
                        <GraduationCap size={28} />
                    </div>
                    <h3 className="education-degree">{profileData.education.degree}</h3>
                    <p className="education-institution">{profileData.education.institution}</p>
                    <p className="education-meta">{profileData.education.location} • {profileData.education.period}</p>
                </div>

                {profileData.publications.map((pub, i) => (
                    <div key={i} className="education-card glow-card">
                        <div className="education-card-icon publication-icon">
                            <BookOpen size={28} />
                        </div>
                        <h3 className="education-degree">{pub.title}</h3>
                        <p className="education-institution">{pub.description}</p>
                        <div className="publication-results">
                            {pub.results.map((r, j) => (
                                <div key={j} className="pub-result">
                                    <span className="pub-result-bullet">▹</span> {r}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
