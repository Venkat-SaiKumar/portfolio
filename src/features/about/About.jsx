import SectionTitle from '../../components/SectionTitle';
import { profileData } from '../../data/profileData';
import './About.css';

export default function About() {
    return (
        <section id="about" className="section">
            <SectionTitle title="about_me" subtitle="Who I am & what I do" />
            <div className="about-container">
                <div className="about-code-block">
                    <div className="about-code-header">
                        <span className="about-filename">profile.json</span>
                    </div>
                    <div className="about-code-body">
                        <div className="code-line"><span className="code-bracket">{'{'}</span></div>
                        <div className="code-line">  <span className="code-key">"name"</span>: <span className="code-string">"{profileData.personal.name}"</span>,</div>
                        <div className="code-line">  <span className="code-key">"role"</span>: <span className="code-string">"{profileData.personal.title}"</span>,</div>
                        <div className="code-line">  <span className="code-key">"location"</span>: <span className="code-string">"{profileData.personal.location}"</span>,</div>
                        <div className="code-line">  <span className="code-key">"experience"</span>: <span className="code-string">"3+ years"</span>,</div>
                        <div className="code-line">  <span className="code-key">"focus"</span>: <span className="code-array">[</span></div>
                        <div className="code-line">    <span className="code-string">"Generative AI"</span>,</div>
                        <div className="code-line">    <span className="code-string">"Multi-Agent Systems"</span>,</div>
                        <div className="code-line">    <span className="code-string">"Enterprise AI Platforms"</span></div>
                        <div className="code-line">  <span className="code-array">]</span>,</div>
                        <div className="code-line">  <span className="code-key">"passion"</span>: <span className="code-string">"Building intelligent systems that transform business operations"</span></div>
                        <div className="code-line"><span className="code-bracket">{'}'}</span></div>
                    </div>
                </div>
                <div className="about-summary">
                    <p>{profileData.personal.summary}</p>
                    <div className="about-highlights">
                        <div className="about-highlight-item">
                            <span className="highlight-number shimmer-text">90%</span>
                            <span className="highlight-label">Cost Reduction</span>
                        </div>
                        <div className="about-highlight-item">
                            <span className="highlight-number shimmer-text">80%</span>
                            <span className="highlight-label">Efficiency Gain</span>
                        </div>
                        <div className="about-highlight-item">
                            <span className="highlight-number shimmer-text">500+</span>
                            <span className="highlight-label">Test Specs Generated</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
