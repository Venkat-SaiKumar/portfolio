import { useEffect, useRef, useState, useCallback } from 'react';
import './AlienSpaceship.css';

const KILL_MESSAGES = [
    "Got 'em! 💥",
    "Bullseye! 🎯",
    "We did it! 🎉",
    "Success! ✨",
    "Yeehaw! 🤠",
    "Another one! 🔥",
    "Too easy! 😎",
    "Ka-boom! 💣",
];

export default function AlienSpaceship() {
    const shipRef = useRef(null);
    const containerRef = useRef(null);
    const posRef = useRef({ x: window.innerWidth / 2, y: 80 });
    const targetRef = useRef({ x: window.innerWidth / 2, y: 80 });
    const frameRef = useRef(null);
    const bobRef = useRef(0);
    const bobYRef = useRef(0);
    const [lasers, setLasers] = useState([]);
    const [explosions, setExplosions] = useState([]);
    const [scorches, setScorches] = useState([]);
    const [shooting, setShooting] = useState(false);
    const [bubbles, setBubbles] = useState([]);
    const laserIdRef = useRef(0);
    const bubbleIdRef = useRef(0);

    // Smooth floating movement with bobbing
    useEffect(() => {
        const changeTarget = () => {
            targetRef.current = {
                x: 100 + Math.random() * (window.innerWidth - 200),
                y: 60 + Math.random() * (window.innerHeight * 0.25),
            };
        };

        changeTarget();
        const interval = setInterval(changeTarget, 3500);

        const animate = () => {
            const pos = posRef.current;
            const target = targetRef.current;
            pos.x += (target.x - pos.x) * 0.012;
            pos.y += (target.y - pos.y) * 0.012;
            bobRef.current += 0.03;

            const bobY = Math.sin(bobRef.current) * 6;
            bobYRef.current = bobY;
            const tiltX = (target.x - pos.x) * 0.08;

            if (shipRef.current) {
                shipRef.current.style.transform =
                    `translate(${pos.x - 50}px, ${pos.y - 27 + bobY}px) rotate(${tiltX}deg)`;
            }
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            clearInterval(interval);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    // Shooting handler
    const handleShoot = useCallback((e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        // Use the actual visual ship position (accounting for bob)
        const shipX = posRef.current.x;
        const shipY = posRef.current.y + bobYRef.current;

        const id = laserIdRef.current++;

        const dx = clickX - shipX;
        const dy = clickY - shipY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const length = Math.sqrt(dx * dx + dy * dy);

        // Laser
        setLasers(prev => [...prev, { id, x: shipX, y: shipY, angle, length }]);

        // Explosion after laser reaches target
        setTimeout(() => {
            setExplosions(prev => [...prev, { id, x: clickX, y: clickY }]);
            setScorches(prev => [...prev, { id, x: clickX, y: clickY }]);
            // Broadcast hit event for alien creatures to detect
            document.dispatchEvent(new CustomEvent('laser-hit', {
                detail: { x: clickX, y: clickY }
            }));
        }, 180);

        // Cleanup
        setTimeout(() => setLasers(prev => prev.filter(l => l.id !== id)), 400);
        setTimeout(() => setExplosions(prev => prev.filter(e => e.id !== id)), 900);
        setTimeout(() => setScorches(prev => prev.filter(s => s.id !== id)), 3200);

        setShooting(true);
        setTimeout(() => setShooting(false), 150);
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleShoot);
        return () => document.removeEventListener('click', handleShoot);
    }, [handleShoot]);

    // Listen for alien kills to show speech bubble
    useEffect(() => {
        const handleAlienKilled = () => {
            const id = bubbleIdRef.current++;
            const msg = KILL_MESSAGES[Math.floor(Math.random() * KILL_MESSAGES.length)];
            setBubbles(prev => [...prev, { id, msg }]);
            setTimeout(() => {
                setBubbles(prev => prev.filter(b => b.id !== id));
            }, 2000);
        };

        document.addEventListener('alien-killed', handleAlienKilled);
        return () => document.removeEventListener('alien-killed', handleAlienKilled);
    }, []);

    return (
        <div ref={containerRef} className="alien-container">
            {/* Spaceship */}
            <div ref={shipRef} className={`spaceship ${shooting ? 'ship-recoil' : ''}`}>
                <div className="ship-body">
                    <div className="ship-dome" />
                    <div className="ship-hull" />
                    <div className="ship-light ship-light-1" />
                    <div className="ship-light ship-light-2" />
                    <div className="ship-light ship-light-3" />
                    <div className="ship-light ship-light-4" />
                    <div className="ship-light ship-light-5" />
                    <div className="ship-engine-left" />
                    <div className="ship-engine-right" />
                    <div className="ship-beam" />
                </div>

                {/* Speech bubbles */}
                {bubbles.map(b => (
                    <div key={b.id} className="ship-bubble">
                        {b.msg}
                    </div>
                ))}
            </div>

            {/* Lasers */}
            {lasers.map(laser => (
                <div
                    key={laser.id}
                    className="laser-beam"
                    style={{
                        left: laser.x,
                        top: laser.y,
                        width: laser.length,
                        transform: `rotate(${laser.angle}deg)`,
                        transformOrigin: '0 50%',
                    }}
                />
            ))}

            {/* Scorch marks */}
            {scorches.map(s => (
                <div
                    key={`scorch-${s.id}`}
                    className="scorch-mark"
                    style={{ left: s.x, top: s.y }}
                />
            ))}

            {/* Explosions */}
            {explosions.map(exp => (
                <div
                    key={exp.id}
                    className="explosion"
                    style={{ left: exp.x, top: exp.y }}
                >
                    <div className="explosion-ring" />
                    <div className="explosion-flash" />
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="explosion-particle"
                            style={{
                                '--angle': `${i * 36}deg`,
                                '--distance': `${35 + Math.random() * 50}px`,
                                '--delay': `${Math.random() * 0.1}s`,
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
