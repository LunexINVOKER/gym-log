import { useState, useEffect, useRef } from "react";

const PRESETS = [30, 60, 90, 120, 180, 240, 300]; // seconds

export default function RestTimer() {
  const [seconds, setSeconds]     = useState(60);
  const [running, setRunning]     = useState(false);
  const [custom, setCustom]       = useState(""); // custom input value
  const intervalRef               = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function playBeep() {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }

  function handleReset(val) {
    setRunning(false);
    setSeconds(val || 60);
  }

  // Handle custom time input — only allow numbers
  function handleCustomSubmit(e) {
    e.preventDefault();
    const val = parseInt(custom);
    if (val > 0) {
      handleReset(val);
      setCustom("");
    }
  }

  function format(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="rest-timer">
      <h3>⏱️ Rest Timer</h3>

      {/* Preset buttons */}
      <div className="timer-presets">
        {PRESETS.map(p => (
          <button key={p} type="button" onClick={() => handleReset(p)}>
            {p}s
          </button>
        ))}
      </div>

      {/* Custom time input */}
      <form onSubmit={handleCustomSubmit} className="timer-custom">
        <input
          type="number"
          placeholder="Custom (sec)"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          min="1"
        />
        <button type="submit">Set</button>
      </form>

      {/* Countdown */}
      <div className={`timer-display ${seconds === 0 ? "timer-done" : ""}`}>
        {format(seconds)}
      </div>

      {/* Controls */}
      <div className="timer-controls">
        {!running ? (
          <button type="button" onClick={() => seconds > 0 && setRunning(true)}>
            ▶ Start
          </button>
        ) : (
          <button type="button" onClick={() => setRunning(false)}>
            ⏸ Pause
          </button>
        )}
        <button type="button" onClick={() => handleReset(60)}>↺ Reset</button>
      </div>
    </div>
  );
}