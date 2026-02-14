import { useState, useRef, useEffect } from 'react';
import { processCommand } from './terminalCommands';
import './Terminal.css';

export default function Terminal() {
    const [history, setHistory] = useState([
        { type: 'system', text: 'Welcome to Venkat Sai\'s Portfolio Terminal v1.0.0' },
        { type: 'system', text: 'Type "help" to see available commands.\n' }
    ]);
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = processCommand(input);

        if (result.type === 'clear') {
            setHistory([]);
        } else {
            setHistory(prev => [
                ...prev,
                { type: 'command', text: input },
                ...(result.output ? [{ type: result.type, text: result.output }] : [])
            ]);
        }

        if (input.trim()) {
            setCmdHistory(prev => [input, ...prev]);
        }
        setInput('');
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <section id="terminal" className="section">
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                    </div>
                    <span className="terminal-title">venkatsai@portfolio:~</span>
                </div>
                <div className="terminal-body" ref={outputRef} onClick={() => inputRef.current?.focus()}>
                    {history.map((entry, i) => (
                        <div key={i} className={`terminal-line terminal-${entry.type}`}>
                            {entry.type === 'command' ? (
                                <><span className="terminal-prompt">visitor@portfolio:~$</span> {entry.text}</>
                            ) : (
                                <pre className="terminal-output">{entry.text}</pre>
                            )}
                        </div>
                    ))}
                    <form onSubmit={handleSubmit} className="terminal-input-line">
                        <span className="terminal-prompt">visitor@portfolio:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="terminal-input"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </form>
                </div>
            </div>
            <div className="terminal-hints">
                <p>Try: <span className="hint-cmd" onClick={() => { setInput('help'); }}>help</span>
                    <span className="hint-cmd" onClick={() => { setInput('about'); }}>about</span>
                    <span className="hint-cmd" onClick={() => { setInput('skills'); }}>skills</span>
                    <span className="hint-cmd" onClick={() => { setInput('experience'); }}>experience</span>
                    <span className="hint-cmd" onClick={() => { setInput('projects'); }}>projects</span>
                </p>
            </div>
        </section>
    );
}
