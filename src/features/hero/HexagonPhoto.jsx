import './HexagonPhoto.css';

export default function HexagonPhoto({ src, alt }) {
    return (
        <div className="hexagon-container">
            <div className="hexagon-glow" />
            <div className="hexagon-border">
                <div className="hexagon-inner">
                    <img src={src} alt={alt} />
                </div>
            </div>
        </div>
    );
}
