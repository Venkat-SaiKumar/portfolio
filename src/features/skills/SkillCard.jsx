import './SkillCard.css';

export default function SkillCard({ category, items, icon, delay }) {
    return (
        <div className="skill-card glow-card" style={{ animationDelay: `${delay * 0.1}s` }}>
            <div className="skill-card-header">
                <span className="skill-card-icon">{icon}</span>
                <h3 className="skill-card-title">{category}</h3>
            </div>
            <div className="skill-card-items">
                {items.map((item, i) => (
                    <span key={i} className="skill-tag">{item}</span>
                ))}
            </div>
        </div>
    );
}
