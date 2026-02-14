import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 100) {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + offset;
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const { offsetTop, offsetHeight } = el;
                    if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
}
