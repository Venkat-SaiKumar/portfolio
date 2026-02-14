import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './AlienCreatures.css';

const ALIEN_COLORS = ['#9acd32', '#00f0ff', '#b400ff', '#ff00aa', '#00ff88', '#ffaa00', '#ff6347', '#7b68ee', '#ff8c42', '#20e3b2'];

/* ============================================================
   15 CREATURE TYPES
   ============================================================ */
const CREATURE_TYPES = [
    { type: 'humanoid', actions: ['sitting', 'waving', 'dancing', 'lookingAround', 'hanging', 'idle'] },
    { type: 'cyclops', actions: ['walking', 'waving', 'lookingAround', 'idle', 'dancing'] },
    { type: 'blob', actions: ['idle', 'dancing', 'lookingAround', 'sitting'] },
    { type: 'spacecat', actions: ['walking', 'sitting', 'lookingAround', 'idle', 'dancing'] },
    { type: 'spacedog', actions: ['walking', 'sitting', 'waving', 'idle', 'dancing'] },
    { type: 'tentacle', actions: ['walking', 'waving', 'dancing', 'lookingAround', 'idle'] },
    { type: 'robot', actions: ['walking', 'idle', 'dancing', 'lookingAround', 'waving'] },
    { type: 'ghost', actions: ['idle', 'waving', 'lookingAround', 'dancing'] },
    { type: 'mushroom', actions: ['walking', 'sitting', 'idle', 'dancing', 'waving'] },
    { type: 'slime', actions: ['idle', 'lookingAround', 'dancing', 'sitting'] },
    { type: 'lizard', actions: ['walking', 'sitting', 'lookingAround', 'idle', 'dancing'] },
    { type: 'monkey', actions: ['walking', 'waving', 'dancing', 'hanging', 'idle', 'lookingAround'] },
    { type: 'bunny', actions: ['walking', 'sitting', 'dancing', 'idle', 'waving', 'lookingAround'] },
    { type: 'spider', actions: ['walking', 'hanging', 'lookingAround', 'idle', 'dancing'] },
    { type: 'worm', actions: ['walking', 'idle', 'lookingAround', 'dancing', 'sitting'] },
];

function adjustColor(hex, amt) {
    const n = parseInt(hex.replace('#', ''), 16);
    const R = Math.max(0, Math.min(255, (n >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((n >> 8) & 0xFF) + amt));
    const B = Math.max(0, Math.min(255, (n & 0xFF) + amt));
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

/* ============================================================
   BODY RENDERERS
   ============================================================ */
function HumanoidBody() {
    return (
        <div className="a-body alien-type-humanoid">
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
    );
}

function CyclopsBody() {
    return (
        <div className="a-body alien-type-cyclops">
            <div className="a-head">
                <div className="a-eye a-eye-c" />
                <div className="a-ant-l" />
            </div>
            <div className="a-torso" />
            <div className="a-arm a-arm-l" />
            <div className="a-arm a-arm-r" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
        </div>
    );
}

function BlobBody() {
    return (
        <div className="a-body alien-type-blob">
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-mouth" />
            </div>
        </div>
    );
}

function SpaceCatBody() {
    return (
        <div className="a-body alien-type-spacecat">
            <div className="a-head">
                <div className="a-ear a-ear-l" />
                <div className="a-ear a-ear-r" />
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-whisker-l" />
                <div className="a-whisker-r" />
            </div>
            <div className="a-torso" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
            <div className="a-leg a-leg-bl" />
            <div className="a-leg a-leg-br" />
            <div className="a-tail" />
        </div>
    );
}

function SpaceDogBody() {
    return (
        <div className="a-body alien-type-spacedog">
            <div className="a-head">
                <div className="a-ear a-ear-l" />
                <div className="a-ear a-ear-r" />
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-eye a-eye-m" />
                <div className="a-snout" />
            </div>
            <div className="a-torso" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
            <div className="a-leg a-leg-bl" />
            <div className="a-leg a-leg-br" />
            <div className="a-tail" />
        </div>
    );
}

function TentacleBody() {
    return (
        <div className="a-body alien-type-tentacle">
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-eye a-eye-m" />
            </div>
            <div className="a-torso" />
            <div className="a-tent a-tent-1" />
            <div className="a-tent a-tent-2" />
            <div className="a-tent a-tent-3" />
            <div className="a-tent a-tent-4" />
        </div>
    );
}

function RobotBody() {
    return (
        <div className="a-body alien-type-robot">
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-ant-l" />
            </div>
            <div className="a-torso">
                <div className="a-panel" />
            </div>
            <div className="a-arm a-arm-l" />
            <div className="a-arm a-arm-r" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
        </div>
    );
}

function GhostBody() {
    return (
        <div className="a-body alien-type-ghost">
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
            </div>
            <div className="a-torso" />
            <div className="a-arm a-arm-l" />
            <div className="a-arm a-arm-r" />
            <div className="a-ghost-trail" />
        </div>
    );
}

function MushroomBody() {
    return (
        <div className="a-body alien-type-mushroom">
            <div className="a-cap">
                <div className="a-spot a-spot-1" />
                <div className="a-spot a-spot-2" />
                <div className="a-spot a-spot-3" />
            </div>
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
            </div>
            <div className="a-torso" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
        </div>
    );
}

function SlimeBody() {
    return (
        <div className="a-body alien-type-slime">
            <div className="a-slime-puddle" />
            <div className="a-stalk a-stalk-l">
                <div className="a-eye" />
            </div>
            <div className="a-stalk a-stalk-r">
                <div className="a-eye" />
            </div>
        </div>
    );
}

/* NEW: Alien Lizard */
function LizardBody() {
    return (
        <div className="a-body alien-type-lizard">
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-horn a-horn-1" />
                <div className="a-horn a-horn-2" />
                <div className="a-horn a-horn-3" />
            </div>
            <div className="a-torso">
                <div className="a-spike a-spike-1" />
                <div className="a-spike a-spike-2" />
                <div className="a-spike a-spike-3" />
            </div>
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
            <div className="a-leg a-leg-bl" />
            <div className="a-leg a-leg-br" />
            <div className="a-liz-tail" />
        </div>
    );
}

/* NEW: Alien Monkey with space helmet */
function MonkeyBody() {
    return (
        <div className="a-body alien-type-monkey">
            <div className="a-helmet" />
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-mouth" />
            </div>
            <div className="a-torso">
                <div className="a-suit-line" />
            </div>
            <div className="a-arm a-arm-l" />
            <div className="a-arm a-arm-r" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
            <div className="a-monkey-tail" />
        </div>
    );
}

/* NEW: Alien Bunny */
function BunnyBody() {
    return (
        <div className="a-body alien-type-bunny">
            <div className="a-head">
                <div className="a-long-ear a-long-ear-l" />
                <div className="a-long-ear a-long-ear-r" />
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-nose" />
            </div>
            <div className="a-torso" />
            <div className="a-arm a-arm-l" />
            <div className="a-arm a-arm-r" />
            <div className="a-leg a-leg-l" />
            <div className="a-leg a-leg-r" />
            <div className="a-puff-tail" />
        </div>
    );
}

/* NEW: Alien Spider */
function SpiderBody() {
    return (
        <div className="a-body alien-type-spider">
            <div className="a-head">
                <div className="a-eye a-eye-1" />
                <div className="a-eye a-eye-2" />
                <div className="a-eye a-eye-3" />
                <div className="a-eye a-eye-4" />
            </div>
            <div className="a-torso" />
            <div className="a-sp-leg a-sp-leg-1" />
            <div className="a-sp-leg a-sp-leg-2" />
            <div className="a-sp-leg a-sp-leg-3" />
            <div className="a-sp-leg a-sp-leg-4" />
            <div className="a-sp-leg a-sp-leg-5" />
            <div className="a-sp-leg a-sp-leg-6" />
        </div>
    );
}

/* NEW: Alien Worm */
function WormBody() {
    return (
        <div className="a-body alien-type-worm">
            <div className="a-head">
                <div className="a-eye a-eye-l" />
                <div className="a-eye a-eye-r" />
                <div className="a-ant-l" />
            </div>
            <div className="a-seg a-seg-1" />
            <div className="a-seg a-seg-2" />
            <div className="a-seg a-seg-3" />
            <div className="a-seg a-seg-4" />
        </div>
    );
}

const BODY_MAP = {
    humanoid: HumanoidBody, cyclops: CyclopsBody, blob: BlobBody,
    spacecat: SpaceCatBody, spacedog: SpaceDogBody, tentacle: TentacleBody,
    robot: RobotBody, ghost: GhostBody, mushroom: MushroomBody, slime: SlimeBody,
    lizard: LizardBody, monkey: MonkeyBody, bunny: BunnyBody,
    spider: SpiderBody, worm: WormBody,
};

/* ============================================================
   FALLING ALIEN — in fixed viewport overlay
   ============================================================ */
function FallingAlien({ x, y, color, creatureType, onDone }) {
    const dark = adjustColor(color, -50);
    const Body = BODY_MAP[creatureType] || HumanoidBody;

    useEffect(() => {
        const timer = setTimeout(onDone, 3000);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div
            className="falling-alien-wrapper"
            style={{
                left: x, top: y,
                '--alien-color': color,
                '--alien-dark': dark,
                '--alien-glow': color + '80',
            }}
        >
            <div className="hit-stars">✦ ✧ ✦</div>
            <Body />
        </div>
    );
}

/* ============================================================
   BAR ALIEN — with personality traits for organic movement
   ============================================================ */
function BarAlien({ color, startPos, flipped: initFlip, onHit, alienId, creatureType, personality }) {
    const ref = useRef(null);
    const posRef = useRef(startPos);
    const [pos, setPos] = useState(startPos);
    const [action, setAction] = useState('idle');
    const [facingLeft, setFacingLeft] = useState(initFlip);
    const [hidden, setHidden] = useState(false);
    const timeoutRef = useRef(null);
    const aliveRef = useRef(true);
    const dark = adjustColor(color, -50);

    // Personality affects timing — each creature feels unique
    const { speed, energy, restiness } = personality;

    const typeConfig = CREATURE_TYPES.find(c => c.type === creatureType) || CREATURE_TYPES[0];
    const Body = BODY_MAP[creatureType] || HumanoidBody;

    useEffect(() => {
        aliveRef.current = true;
        let actionCount = 0;

        const doNextThing = () => {
            if (!aliveRef.current || hidden) return;
            actionCount++;

            const roll = Math.random();
            // Energetic creatures walk more, lazy ones rest more
            const walkChance = 0.3 + (energy * 0.3);

            if (roll < walkChance) {
                // Walk — distance varies, short hops and long treks
                const walkDist = (8 + Math.random() * 40) * (Math.random() > 0.7 ? 2 : 1);
                const dir = Math.random() > 0.5 ? 1 : -1;
                let newPos = posRef.current + (walkDist * dir);
                newPos = Math.max(3, Math.min(95, newPos));

                setFacingLeft(newPos < posRef.current);
                posRef.current = newPos;
                setAction('walking');
                setPos(newPos);

                // Walk duration based on distance + personality speed
                const dist = Math.abs(walkDist);
                const walkTime = (1500 + dist * 40) / speed;

                timeoutRef.current = setTimeout(() => {
                    if (!aliveRef.current) return;
                    setAction('idle');
                    // Natural pause — restier creatures pause longer
                    const pauseTime = (300 + Math.random() * 800) * restiness;
                    timeoutRef.current = setTimeout(() => {
                        if (!aliveRef.current) return;
                        // Sometimes do another action, sometimes walk again right away
                        if (Math.random() < 0.6) {
                            const acts = typeConfig.actions.filter(a => a !== 'walking');
                            const act = acts[Math.floor(Math.random() * acts.length)];
                            setAction(act);
                            const actionDur = (2000 + Math.random() * 3000) / energy;
                            timeoutRef.current = setTimeout(doNextThing, actionDur);
                        } else {
                            doNextThing();
                        }
                    }, pauseTime);
                }, walkTime);
            } else if (roll < walkChance + 0.15 && actionCount > 2) {
                // Occasional long rest — makes them feel alive
                setAction('idle');
                const restTime = (4000 + Math.random() * 5000) * restiness;
                timeoutRef.current = setTimeout(doNextThing, restTime);
            } else {
                // Do a random action
                const acts = typeConfig.actions.filter(a => a !== 'walking');
                const act = acts[Math.floor(Math.random() * acts.length)];
                setAction(act);
                const actionDur = (2500 + Math.random() * 3500) / energy;
                timeoutRef.current = setTimeout(doNextThing, actionDur);
            }
        };

        // Staggered start — creatures don't all start at once
        timeoutRef.current = setTimeout(doNextThing, 500 + Math.random() * 3000);

        return () => {
            aliveRef.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [hidden, speed, energy, restiness]);

    useEffect(() => {
        const handleLaserHit = (e) => {
            if (hidden || !ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.sqrt((e.detail.x - cx) ** 2 + (e.detail.y - cy) ** 2);

            if (dist < 25) {
                setHidden(true);
                aliveRef.current = false;
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                onHit(alienId, cx, cy, color, creatureType);
                document.dispatchEvent(new CustomEvent('alien-killed'));
            }
        };

        document.addEventListener('laser-hit', handleLaserHit);
        return () => document.removeEventListener('laser-hit', handleLaserHit);
    }, [hidden, onHit, alienId, color, creatureType]);

    if (hidden) return null;

    // CSS variables for per-creature animation speed variation
    const speedVar = 0.7 + speed * 0.6; // 0.7–1.3
    const scaleVar = 0.9 + Math.random() * 0.2; // 0.9–1.1 slight size variation

    return (
        <div
            ref={ref}
            className={`bar-alien alien-act-${action} ${facingLeft ? 'flip' : ''}`}
            style={{
                '--alien-color': color,
                '--alien-dark': dark,
                '--alien-glow': color + '80',
                '--speed': speedVar,
                '--scale': scaleVar,
                '--blink-delay': `${2 + Math.random() * 6}s`,
                left: `${pos}%`,
                transform: `scale(${scaleVar})`,
            }}
        >
            <Body />
        </div>
    );
}

function AlienRow({ children }) {
    return <div className="alien-bar-row">{children}</div>;
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
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
                    const ct = CREATURE_TYPES[Math.floor(Math.random() * CREATURE_TYPES.length)];
                    aliens.push({
                        id: nextIdRef.current++,
                        color: ALIEN_COLORS[Math.floor(Math.random() * ALIEN_COLORS.length)],
                        startPos: 10 + (i * 35) + Math.random() * 15,
                        flipped: Math.random() > 0.5,
                        creatureType: ct.type,
                        personality: {
                            speed: 0.5 + Math.random() * 1.0,   // 0.5–1.5
                            energy: 0.4 + Math.random() * 0.8,  // 0.4–1.2
                            restiness: 0.6 + Math.random() * 1.0 // 0.6–1.6
                        },
                    });
                }
                g.push({ id: idx, el, aliens });
            });
            setGroups(g);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleAlienHit = useCallback((alienId, screenX, screenY, color, creatureType) => {
        const fallingId = fallingIdRef.current++;
        setFallingAliens(prev => [...prev, { id: fallingId, x: screenX, y: screenY, color, creatureType }]);

        setGroups(prev => {
            const newGroups = prev.map(g => ({
                ...g,
                aliens: g.aliens.filter(a => a.id !== alienId),
            }));

            const randomBarIdx = Math.floor(Math.random() * newGroups.length);
            const ct = CREATURE_TYPES[Math.floor(Math.random() * CREATURE_TYPES.length)];
            const newAlien = {
                id: nextIdRef.current++,
                color: ALIEN_COLORS[Math.floor(Math.random() * ALIEN_COLORS.length)],
                startPos: 5 + Math.random() * 85,
                flipped: Math.random() > 0.5,
                creatureType: ct.type,
                personality: {
                    speed: 0.5 + Math.random() * 1.0,
                    energy: 0.4 + Math.random() * 0.8,
                    restiness: 0.6 + Math.random() * 1.0
                },
            };
            newGroups[randomBarIdx] = {
                ...newGroups[randomBarIdx],
                aliens: [...newGroups[randomBarIdx].aliens, newAlien],
            };

            return newGroups;
        });
    }, []);

    const handleFallingDone = useCallback((fallingId) => {
        setFallingAliens(prev => prev.filter(f => f.id !== fallingId));
    }, []);

    return (
        <>
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
                                creatureType={a.creatureType}
                                personality={a.personality}
                                onHit={handleAlienHit}
                            />
                        ))}
                    </AlienRow>,
                    group.el
                )
            )}

            <div className="falling-aliens-overlay">
                {fallingAliens.map(f => (
                    <FallingAlien
                        key={f.id}
                        x={f.x}
                        y={f.y}
                        color={f.color}
                        creatureType={f.creatureType}
                        onDone={() => handleFallingDone(f.id)}
                    />
                ))}
            </div>
        </>
    );
}
