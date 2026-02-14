import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import { profileData } from '../../data/profileData';
import './Contact.css';

export default function Contact() {
    const { email, phone, location, github, linkedin } = profileData.personal;
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    return (
        <section id="contact" className="section">
            <SectionTitle title="contact" subtitle="Let's connect" />

            <div className="contact-container">
                <div className="contact-info">
                    <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="contact-item glow-card">
                        <Mail size={20} className="contact-icon" />
                        <div>
                            <p className="contact-label">Email</p>
                            <p className="contact-value">{email}</p>
                        </div>
                    </a>
                    <a href={`tel:${phone}`} className="contact-item glow-card">
                        <Phone size={20} className="contact-icon" />
                        <div>
                            <p className="contact-label">Phone</p>
                            <p className="contact-value">{phone}</p>
                        </div>
                    </a>
                    <div className="contact-item glow-card">
                        <MapPin size={20} className="contact-icon" />
                        <div>
                            <p className="contact-label">Location</p>
                            <p className="contact-value">{location}</p>
                        </div>
                    </div>
                </div>

                <div className="contact-socials">
                    <a href={github} target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                        <Github size={22} />
                        <span>GitHub</span>
                    </a>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                        <Linkedin size={22} />
                        <span>LinkedIn</span>
                    </a>
                    <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="contact-social-btn contact-social-primary">
                        <Send size={22} />
                        <span>Send Email</span>
                    </a>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-line" />
                <p className="footer-text">
                    <span className="neon-text-green">{'>'}</span> Designed & Built by <span className="shimmer-text">{profileData.personal.name}</span>
                </p>
                <p className="footer-copy">© 2024 All rights reserved.</p>
            </footer>
        </section>
    );
}
