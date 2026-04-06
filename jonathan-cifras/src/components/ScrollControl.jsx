import { useState, useEffect, useRef } from "react";

export default function ScrollControl() {
  const [speed, setSpeed] = useState(0);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const boxRef = useRef(null); // referência do componente

  useEffect(() => {
    let interval;

    if (speed > 0) {
      const delay = 45 - speed;

      interval = setInterval(() => {
        window.scrollBy(0, 1);
      }, delay);
    }

    return () => clearInterval(interval);
  }, [speed]);

  // 👇 FECHAR AO CLICAR FORA
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlayPause = () => {
    if (playing) {
      setSpeed(0);
      setPlaying(false);
    } else {
      setSpeed(15);
      setPlaying(true);
    }
  };

  return (
    <div ref={boxRef} className={`scroll-box ${open ? "open" : ""}`}>
      <button className="scroll-btn" onClick={() => setOpen(!open)}>
        <i className="bi bi-caret-down-square-fill"></i>
      </button>

      {open && (
        <div className="scroll-panel">
          <label htmlFor="speed-slider">Velocidade</label>
          <div style={{ display: "flex", gap: 20 }}>
            <button onClick={handlePlayPause}>
              {playing ? (
                <i className="bi bi-pause-fill"></i>
              ) : (
                <i className="bi bi-play-fill"></i>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="40"
              value={speed}
              onChange={(e) => {
                const value = Number(e.target.value);
                setSpeed(value);
                setPlaying(value > 0); // sincroniza com slider
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
