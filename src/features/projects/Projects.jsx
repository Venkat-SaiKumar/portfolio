import SectionTitle from '../../components/SectionTitle';
import { profileData } from '../../data/profileData';
import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
    return (
        <section id="projects" className="section">
            <SectionTitle title="projects" subtitle="Things I've built" />
            <div className="projects-grid">
                {profileData.projects.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </div>
        </section>
    );
}
