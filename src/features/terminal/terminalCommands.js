import { profileData } from '../../data/profileData';

const helpText = `Available commands:
  about        - Learn about me
  skills       - View my technical skills
  experience   - See my work experience
  projects     - Browse my projects
  education    - View my education
  publications - Read my publications
  contact      - Get my contact info
  clear        - Clear the terminal
  help         - Show this help message`;

const formatSkills = () => {
    return profileData.skills.map(s =>
        `\n  [${s.category}]\n  ${s.items.join(' • ')}`
    ).join('\n');
};

const formatExperience = () => {
    return profileData.experience.map(exp =>
        `\n  ╔══ ${exp.role} @ ${exp.company} ══╗\n  ║  ${exp.period} | ${exp.location}\n  ║\n` +
        exp.projects.map(p =>
            `  ║  ▸ ${p.name}\n  ║    ${p.description.substring(0, 100)}...\n  ║    Tech: ${p.tech.join(', ')}`
        ).join('\n') + '\n  ╚══════════════════════════════════╝'
    ).join('\n');
};

const formatProjects = () => {
    return profileData.projects.map((p, i) =>
        `\n  [${i + 1}] ${p.name}\n      ${p.description}\n      Tech: ${p.tech.join(', ')}`
    ).join('\n');
};

const formatContact = () => {
    const { email, phone, location, github, linkedin } = profileData.personal;
    return `
  ┌─────────────────────────────────┐
  │  📧 Email    : ${email}
  │  📱 Phone    : ${phone}
  │  📍 Location : ${location}
  │  🔗 GitHub   : ${github}
  │  🔗 LinkedIn : ${linkedin}
  └─────────────────────────────────┘`;
};

const formatEducation = () => {
    const edu = profileData.education;
    return `
  🎓 ${edu.degree}
     ${edu.institution}
     ${edu.location} | ${edu.period}`;
};

const formatPublications = () => {
    return profileData.publications.map(p =>
        `\n  📄 ${p.title}\n     ${p.description}\n     Results:\n` +
        p.results.map(r => `       • ${r}`).join('\n')
    ).join('\n');
};

export const processCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();

    switch (command) {
        case 'help':
            return { output: helpText, type: 'info' };
        case 'about':
            return { output: `\n  ${profileData.personal.summary}`, type: 'success' };
        case 'skills':
            return { output: formatSkills(), type: 'success' };
        case 'experience':
            return { output: formatExperience(), type: 'success' };
        case 'projects':
            return { output: formatProjects(), type: 'success' };
        case 'education':
            return { output: formatEducation(), type: 'success' };
        case 'publications':
            return { output: formatPublications(), type: 'success' };
        case 'contact':
            return { output: formatContact(), type: 'success' };
        case 'clear':
            return { output: '', type: 'clear' };
        case '':
            return { output: '', type: 'empty' };
        default:
            return {
                output: `  Command not found: '${command}'\n  Type 'help' to see available commands.`,
                type: 'error'
            };
    }
};
