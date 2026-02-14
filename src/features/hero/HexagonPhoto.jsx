import './HexagonPhoto.css';

export default function HexagonPhoto({ src, alt }) {
    return (
        <div className="hex-wrapper">
            <div className="hex-outer">
                <div className="hex-border">
                    <div className="hex-photo">
                        <img src={src} alt={alt} />
                    </div>
                </div>
            </div>
            <svg className="hex-glow-svg" viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="50%" stopColor="#b400ff" />
                        <stop offset="100%" stopColor="#ff00aa" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <polygon
                    points="150,10 285,90 285,250 150,330 15,250 15,90"
                    fill="none"
                    stroke="url(#hexGrad)"
                    strokeWidth="3"
                    filter="url(#glow)"
                />
            </svg>
        </div>
    );
}
