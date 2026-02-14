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

/* ============================================================
   CREATURE VOICES — per-type speech for interactions
   ============================================================ */
const CREATURE_VOICES = {
    humanoid: { greet: ['👋 Hey!', 'Sup!', 'Hello!', '✌️'], chat: ['Nice day!', '🌟 Cool!', 'Beep boop', '😄'], death: '😵 Nooo!', nearby: ['Howdy!', 'Oh hi!'] },
    cyclops: { greet: ['👁️ Hi!', '*stares*', 'Yo!'], chat: ['See that?', 'One eye > two!', '🔭'], death: '😵 Ow!', nearby: ['*blinks*', 'Hey there!'] },
    blob: { greet: ['~blorb~', '💧 Hiii', '*wobble*'], chat: ['*jiggle*', 'Gloop!', '~squishy~', '💦'], death: '💦 Splat!', nearby: ['~bounce~', '*squish*'] },
    spacecat: { greet: ['😺 Meow!', 'Mew!', '*purr*'], chat: ['🐟 Fish?', '*stretch*', 'Purrr~', '😸'], death: '🙀 Hiss!', nearby: ['*sniff*', 'Mrrp?'] },
    spacedog: { greet: ['🐕 Woof!', 'Bark bark!', '*pant*'], chat: ['🦴 Bone?', '*tail wag*', 'Arf!', '😛'], death: '😢 Yipe!', nearby: ['*sniff sniff*', 'Friend!!'] },
    tentacle: { greet: ['🐙 Hello!', '*wave wave*', 'Blurb!'], chat: ['Tentacool!', '*wiggle*', '🌊'], death: '😰 Splurp!', nearby: ['*tentacle wave*', 'Ooh!'] },
    robot: { greet: ['🤖 BEEP', '01001000', 'Greetings'], chat: ['Analyzing...', '⚡ Bzzt', '*scan*', '🔧'], death: '⚡ ERROR!', nearby: ['*scan*', 'Detected!'] },
    ghost: { greet: ['👻 Boo!', '*floats by*', 'Ooo~'], chat: ['Spooky!', '*phases*', '~whooo~', '💀'], death: '💨 Poof!', nearby: ['~whooo~', '*appear*'] },
    mushroom: { greet: ['🍄 Howdy!', '*bounces*', 'Hi hi!'], chat: ['Spore-tastic!', '🌱', '*wiggle cap*'], death: '🍄 Poof!', nearby: ['*spore puff*', 'Oh!'] },
    slime: { greet: ['💚 Gloop!', '~ooze~', '*bubble*'], chat: ['*bubble pop*', 'Splorch!', '~drip~'], death: '💧 Melt!', nearby: ['~ooze~', '*bubble*'] },
    lizard: { greet: ['🦎 Sss!', '*tongue flick*', 'Hey!'], chat: ['*bask*', 'Warm here!', '*tail whip*', '🌞'], death: '🦎 Argh!', nearby: ['*tongue flick*', 'Sss?'] },
    monkey: { greet: ['🐒 Ooh ooh!', '*jumps*', 'Heya!'], chat: ['🍌 Banana?', '*scratch*', 'Eee!', '🎉'], death: '🐒 Eek!', nearby: ['*curious*', 'Ooh!'] },
    bunny: { greet: ['🐰 *hop hop*', 'Squeak!', 'Hii!'], chat: ['🥕 Carrot?', '*nose twitch*', '*binky!*'], death: '🐰 Eep!', nearby: ['*nose wiggle*', 'Oh!'] },
    spider: { greet: ['🕷 *clicks*', 'Hisss-hi!', '*wave legs*'], chat: ['Web time!', '*scuttle*', '🕸️'], death: '🕷 Skree!', nearby: ['*mandible click*', '*8 eyes blink*'] },
    worm: { greet: ['🐛 Wiggle!', '*poke*', 'Hewwo!'], chat: ['*munch*', '🌱 Yum!', '*burrow*'], death: '🐛 Squish!', nearby: ['*wiggle*', '*poke up*'] },
};

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
   BAR ALIEN — with personality, interactions & speech bubbles
   ============================================================ */
function BarAlien({ color, startPos, flipped: initFlip, onHit, alienId, creatureType, personality, positionsRef }) {
    const ref = useRef(null);
    const posRef = useRef(startPos);
    const [pos, setPos] = useState(startPos);
    const [action, setAction] = useState('idle');
    const [facingLeft, setFacingLeft] = useState(initFlip);
    const [hidden, setHidden] = useState(false);
    const [bubble, setBubble] = useState(null);
    const timeoutRef = useRef(null);
    const bubbleTimerRef = useRef(null);
    const aliveRef = useRef(true);
    const interactCooldownRef = useRef(false);
    const dark = adjustColor(color, -50);
    const scaleRef = useRef(0.9 + Math.random() * 0.2);

    const { speed, energy, restiness } = personality;
    const voices = CREATURE_VOICES[creatureType] || CREATURE_VOICES.humanoid;
    const typeConfig = CREATURE_TYPES.find(c => c.type === creatureType) || CREATURE_TYPES[0];
    const Body = BODY_MAP[creatureType] || HumanoidBody;

    // Show a speech bubble for a duration
    const showBubble = useCallback((msg, duration = 2200) => {
        if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
        setBubble(msg);
        bubbleTimerRef.current = setTimeout(() => setBubble(null), duration);
    }, []);

    // Update shared position map
    useEffect(() => {
        if (positionsRef) {
            positionsRef.current.set(alienId, { pos: posRef.current, type: creatureType, showBubble });
        }
        return () => { if (positionsRef) positionsRef.current.delete(alienId); };
    }, [alienId, creatureType, positionsRef, showBubble]);

    useEffect(() => {
        if (positionsRef) {
            positionsRef.current.set(alienId, { pos: posRef.current, type: creatureType, showBubble });
        }
    }, [pos]);

    // Proximity interaction check
    useEffect(() => {
        if (!positionsRef) return;
        const checkNearby = () => {
            if (!aliveRef.current || hidden || interactCooldownRef.current) return;
            const myPos = posRef.current;
            for (const [id, data] of positionsRef.current) {
                if (id === alienId) continue;
                if (Math.abs(data.pos - myPos) < 12) {
                    interactCooldownRef.current = true;
                    // I greet them
                    const roll = Math.random();
                    let myMsg, theirMsg;
                    if (roll < 0.4) {
                        myMsg = voices.greet[Math.floor(Math.random() * voices.greet.length)];
                        const theirVoices = CREATURE_VOICES[data.type] || CREATURE_VOICES.humanoid;
                        theirMsg = theirVoices.greet[Math.floor(Math.random() * theirVoices.greet.length)];
                    } else if (roll < 0.75) {
                        myMsg = voices.chat[Math.floor(Math.random() * voices.chat.length)];
                        const theirVoices = CREATURE_VOICES[data.type] || CREATURE_VOICES.humanoid;
                        theirMsg = theirVoices.chat[Math.floor(Math.random() * theirVoices.chat.length)];
                    } else {
                        myMsg = voices.nearby[Math.floor(Math.random() * voices.nearby.length)];
                        const theirVoices = CREATURE_VOICES[data.type] || CREATURE_VOICES.humanoid;
                        theirMsg = theirVoices.nearby[Math.floor(Math.random() * theirVoices.nearby.length)];
                    }
                    showBubble(myMsg);
                    // The other creature responds after a short delay
                    setTimeout(() => {
                        if (data.showBubble) data.showBubble(theirMsg);
                    }, 600 + Math.random() * 400);
                    // Cooldown before next interaction
                    setTimeout(() => { interactCooldownRef.current = false; }, 8000 + Math.random() * 6000);
                    break;
                }
            }
        };
        const interval = setInterval(checkNearby, 4000 + Math.random() * 3000);
        return () => clearInterval(interval);
    }, [hidden, alienId, positionsRef, voices, showBubble]);

    // Movement behavior
    useEffect(() => {
        aliveRef.current = true;
        let actionCount = 0;

        const doNextThing = () => {
            if (!aliveRef.current || hidden) return;
            actionCount++;

            const roll = Math.random();
            const walkChance = 0.3 + (energy * 0.3);

            if (roll < walkChance) {
                const walkDist = (8 + Math.random() * 40) * (Math.random() > 0.7 ? 2 : 1);
                const dir = Math.random() > 0.5 ? 1 : -1;
                let newPos = posRef.current + (walkDist * dir);
                newPos = Math.max(3, Math.min(95, newPos));

                setFacingLeft(newPos < posRef.current);
                posRef.current = newPos;
                setAction('walking');
                setPos(newPos);

                const dist = Math.abs(walkDist);
                const walkTime = (1500 + dist * 40) / speed;

                timeoutRef.current = setTimeout(() => {
                    if (!aliveRef.current) return;
                    setAction('idle');
                    const pauseTime = (300 + Math.random() * 800) * restiness;
                    timeoutRef.current = setTimeout(() => {
                        if (!aliveRef.current) return;
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
                setAction('idle');
                const restTime = (4000 + Math.random() * 5000) * restiness;
                timeoutRef.current = setTimeout(doNextThing, restTime);
            } else {
                const acts = typeConfig.actions.filter(a => a !== 'walking');
                const act = acts[Math.floor(Math.random() * acts.length)];
                setAction(act);
                const actionDur = (2500 + Math.random() * 3500) / energy;
                timeoutRef.current = setTimeout(doNextThing, actionDur);
            }
        };

        timeoutRef.current = setTimeout(doNextThing, 500 + Math.random() * 3000);

        return () => {
            aliveRef.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [hidden, speed, energy, restiness]);

    // Laser hit detection + death sound
    useEffect(() => {
        const handleLaserHit = (e) => {
            if (hidden || !ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.sqrt((e.detail.x - cx) ** 2 + (e.detail.y - cy) ** 2);

            if (dist < 25) {
                // Death sound bubble — broadcast to nearby aliens
                showBubble(voices.death, 1500);
                // Notify nearby aliens to react
                if (positionsRef) {
                    for (const [id, data] of positionsRef.current) {
                        if (id === alienId) continue;
                        if (Math.abs(data.pos - posRef.current) < 25) {
                            const theirVoices = CREATURE_VOICES[data.type] || CREATURE_VOICES.humanoid;
                            const reactions = ['😱 Oh no!', '😰 Run!', '🫣 Yikes!', '😢'];
                            const react = reactions[Math.floor(Math.random() * reactions.length)];
                            setTimeout(() => {
                                if (data.showBubble) data.showBubble(react, 2000);
                            }, 300);
                        }
                    }
                }

                setTimeout(() => {
                    setHidden(true);
                    aliveRef.current = false;
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    onHit(alienId, cx, cy, color, creatureType);
                    document.dispatchEvent(new CustomEvent('alien-killed'));
                }, 200);
            }
        };

        document.addEventListener('laser-hit', handleLaserHit);
        return () => document.removeEventListener('laser-hit', handleLaserHit);
    }, [hidden, onHit, alienId, color, creatureType, voices, positionsRef, showBubble]);

    if (hidden) return null;

    const speedVar = 0.7 + speed * 0.6;

    return (
        <div
            ref={ref}
            className={`bar-alien alien-act-${action} ${facingLeft ? 'flip' : ''}`}
            style={{
                '--alien-color': color,
                '--alien-dark': dark,
                '--alien-glow': color + '80',
                '--speed': speedVar,
                '--blink-delay': `${2 + Math.random() * 6}s`,
                left: `${pos}%`,
                transform: `scale(${scaleRef.current})`,
            }}
        >
            {bubble && <div className="creature-bubble" key={bubble}>{bubble}</div>}
            <Body />
        </div>
    );
}

/* AlienGroup — wraps aliens on a bar with shared position tracking */
function AlienGroup({ aliens, onHit }) {
    const positionsRef = useRef(new Map());
    return (
        <div className="alien-bar-row">
            {aliens.map(a => (
                <BarAlien
                    key={a.id}
                    alienId={a.id}
                    color={a.color}
                    startPos={a.startPos}
                    flipped={a.flipped}
                    creatureType={a.creatureType}
                    personality={a.personality}
                    positionsRef={positionsRef}
                    onHit={onHit}
                />
            ))}
        </div>
    );
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
                    <AlienGroup
                        key={group.id}
                        aliens={group.aliens}
                        onHit={handleAlienHit}
                    />,
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
