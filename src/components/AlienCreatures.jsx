import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './AlienCreatures.css';

const ALIEN_COLORS = ['#9acd32', '#00f0ff', '#b400ff', '#ff00aa', '#00ff88', '#ffaa00'];
const ACTIONS = ['sitting', 'waving', 'dancing', 'lookingAround', 'hanging', 'idle'];

function adjustColor(hex, amt) {
    const n = parseInt(hex.replace('#', ''), 16);
    const R = Math.max(0, Math.min(255, (n >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((n >> 8) & 0xFF) + amt));
    const B = Math.max(0, Math.min(255, (n & 0xFF) + amt));
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

// Falling alien rendered in fixed viewport overlay
function FallingAlien({ x, y, color, onDone }) {
    const dark = adjustColor(color, -50);

    useEffect(() => {
        const timer = setTimeout(onDone, 3000);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div
            className="falling-alien-wrapper"
            style={{
                left: x,
                top: y,
                '--alien-color': color,
                '--alien-dark': dark,
                '--alien-glow': color + '80',
            }}
        >
            <div className="hit-stars">✦ ✧ ✦</div>
            <div className="a-body falling-body">
                <div className="a-head">
                    <div className="a-eye a-eye-l hit-eye" />
                    <div className="a-eye a-eye-r hit-eye" />
                    <div className="a-ant-l" />
                    <div className="a-ant-r" />
                </div>
                <div className="a-torso" />
                <div className="a-arm a-arm-l hit-arm-l" />
                <div className="a-arm a-arm-r hit-arm-r" />
                <div className="a-leg a-leg-l" />
                <div className="a-leg a-leg-r" />
            </div>
        </div>
    );
}

// Individual alien on a bar
function BarAlien({ color, startPos, flipped: initFlip, onHit, alienId }) {
    const ref = useRef(null);
    const [pos, setPos] = useState(startPos);
    const [action, setAction] = useState('idle');
    const [facingLeft, setFacingLeft] = useState(initFlip);
    const [hidden, setHidden] = useState(false);
    const timeoutRef = useRef(null);
    const aliveRef = useRef(true);
    const dark = adjustColor(color, -50);

    useEffect(() => {
        aliveRef.current = true;

        const doNextThing = () => {
            if (!aliveRef.current || hidden) return;

            const roll = Math.random();
            if (roll < 0.45) {
                const newPos = 5 + Math.random() * 85;
                setFacingLeft(newPos < pos);
                setAction('walking');
                setPos(newPos);
                const walkTime = 2000 + Math.random() * 2000;
                timeoutRef.current = setTimeout(() => {
                    if (!aliveRef.current) return;
                    const act = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                    setAction(act);
                    timeoutRef.current = setTimeout(doNextThing, 2000 + Math.random() * 4000);
                }, walkTime);
            } else {
                const act = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
                setAction(act);
                timeoutRef.current = setTimeout(doNextThing, 2500 + Math.random() * 4000);
            }
        };

        timeoutRef.current = setTimeout(doNextThing, 500 + Math.random() * 2000);

        return () => {
            aliveRef.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [hidden]);

    // Listen for laser hits
    useEffect(() => {
        const handleLaserHit = (e) => {
            if (hidden || !ref.current) return;
            const el = ref.current;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const hitX = e.detail.x;
            const hitY = e.detail.y;
            const dist = Math.sqrt((hitX - cx) ** 2 + (hitY - cy) ** 2);

            if (dist < 60) {
                // Get screen position before hiding
                setHidden(true);
                aliveRef.current = false;
                if (timeoutRef.current) clearTimeout(timeoutRef.current);

                // Tell parent where this alien was on screen
                onHit(alienId, cx, cy, color);

                // Notify spaceship about the kill for speech bubble
                document.dispatchEvent(new CustomEvent('alien-killed'));
            }
        };

        document.addEventListener('laser-hit', handleLaserHit);
        return () => document.removeEventListener('laser-hit', handleLaserHit);
    }, [hidden, onHit, alienId, color]);

    if (hidden) return null;

    const style = {
        '--alien-color': color,
        '--alien-dark': dark,
        '--alien-glow': color + '80',
        left: `${pos}%`,
    };

    return (
        <div
            ref={ref}
            className={`bar-alien alien-act-${action} ${facingLeft ? 'flip' : ''}`}
            style={style}
        >
            <div className="a-body">
                <div className="a-head">
                    <div className="a-eye a-eye-l" />
                    <div className="a-eye a-eye-r" />
                    <div className="a-ant-l" />
                    <div className="a-ant-r" />
                </div>
                <div className="a-torso" />
                <div className="a-arm a-arm-l" />
                <div className="a-arm a-arm-r" />
                <div className="a-leg a-leg-l" />
                <div className="a-leg a-leg-r" />
            </div>
        </div>
    );
}

function AlienRow({ children }) {
    return <div className="alien-bar-row">{children}</div>;
}

export default function AlienCreatures() {
    const [groups, setGroups] = useState([]);
    const [fallingAliens, setFallingAliens] = useState([]);
    const nextIdRef = useRef(100);
    const fallingIdRef = useRef(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const dividers = document.querySelectorAll('.section-divider');
            const g = [];
            dividers.forEach((el, idx) => {
                el.style.position = 'relative';
                el.style.overflow = 'visible';
                el.style.zIndex = '5';
                const count = 2 + Math.floor(Math.random() * 2);
                const aliens = [];
                for (let i = 0; i < count; i++) {
                    aliens.push({
                        id: nextIdRef.current++,
                        color: ALIEN_COLORS[Math.floor(Math.random() * ALIEN_COLORS.length)],
                        startPos: 10 + (i * 35) + Math.random() * 15,
                        flipped: Math.random() > 0.5,
                    });
                }
                g.push({ id: idx, el, aliens });
            });
            setGroups(g);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // When an alien is hit — remove from bar, spawn falling clone + respawn new one
    const handleAlienHit = useCallback((alienId, screenX, screenY, color) => {
        // Add falling alien at the screen position
        const fallingId = fallingIdRef.current++;
        setFallingAliens(prev => [...prev, { id: fallingId, x: screenX, y: screenY, color }]);

        // Remove hit alien from bar and spawn a new one on a random bar
        setGroups(prev => {
            const newGroups = prev.map(g => ({
                ...g,
                aliens: g.aliens.filter(a => a.id !== alienId),
            }));

            // Spawn new alien on a random bar after a delay
            const randomBarIdx = Math.floor(Math.random() * newGroups.length);
            const newAlien = {
                id: nextIdRef.current++,
                color: ALIEN_COLORS[Math.floor(Math.random() * ALIEN_COLORS.length)],
                startPos: 5 + Math.random() * 85,
                flipped: Math.random() > 0.5,
            };
            newGroups[randomBarIdx] = {
                ...newGroups[randomBarIdx],
                aliens: [...newGroups[randomBarIdx].aliens, newAlien],
            };

            return newGroups;
        });
    }, []);

    // Remove falling alien after animation completes
    const handleFallingDone = useCallback((fallingId) => {
        setFallingAliens(prev => prev.filter(f => f.id !== fallingId));
    }, []);

    return (
        <>
            {/* Bar aliens via portals */}
            {groups.map(group =>
                createPortal(
                    <AlienRow key={group.id}>
                        {group.aliens.map(a => (
                            <BarAlien
                                key={a.id}
                                alienId={a.id}
                                color={a.color}
                                startPos={a.startPos}
                                flipped={a.flipped}
                                onHit={handleAlienHit}
                            />
                        ))}
                    </AlienRow>,
                    group.el
                )
            )}

            {/* Falling aliens — fixed overlay so they fall visibly across viewport */}
            <div className="falling-aliens-overlay">
                {fallingAliens.map(f => (
                    <FallingAlien
                        key={f.id}
                        x={f.x}
                        y={f.y}
                        color={f.color}
                        onDone={() => handleFallingDone(f.id)}
                    />
                ))}
            </div>
        </>
    );
}
