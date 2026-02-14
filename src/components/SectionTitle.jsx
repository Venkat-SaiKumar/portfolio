import './SectionTitle.css';

export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="section-title">
            <div className="section-title-line" />
            <h2 className="section-title-text">
                <span className="neon-text-green">{'>'}</span> {title}
            </h2>
            {subtitle && <p className="section-title-subtitle">{subtitle}</p>}
            <div className="section-title-line" />
        </div>
    );
}
