import { Code2, Brain, Sparkles, Network, MessageSquare, Database, Server, Cloud, Container } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import { profileData } from '../../data/profileData';
import SkillCard from './SkillCard';
import './Skills.css';

const iconMap = {
    Code2: <Code2 size={20} />,
    Brain: <Brain size={20} />,
    Sparkles: <Sparkles size={20} />,
    Network: <Network size={20} />,
    MessageSquare: <MessageSquare size={20} />,
    Database: <Database size={20} />,
    Server: <Server size={20} />,
    Cloud: <Cloud size={20} />,
    Container: <Container size={20} />,
};

export default function Skills() {
    return (
        <section id="skills" className="section">
            <SectionTitle title="skills" subtitle="Technologies I work with" />
            <div className="skills-grid">
                {profileData.skills.map((skill, i) => (
                    <SkillCard
                        key={skill.category}
                        category={skill.category}
                        items={skill.items}
                        icon={iconMap[skill.icon]}
                        delay={i}
                    />
                ))}
            </div>
        </section>
    );
}
