import SectionTitle from '../../components/SectionTitle';
import { profileData } from '../../data/profileData';
import TimelineItem from './TimelineItem';
import './Experience.css';

export default function Experience() {
    return (
        <section id="experience" className="section">
            <SectionTitle title="experience" subtitle="Where I've worked" />
            <div className="experience-timeline">
                {profileData.experience.map((exp, i) => (
                    <TimelineItem key={i} {...exp} />
                ))}
            </div>
        </section>
    );
}
