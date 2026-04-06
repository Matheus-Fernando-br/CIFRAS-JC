import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  const [fontScale, setFontScale] = useState(
    Number(localStorage.getItem("fontScale")) || 1,
  );

  const [open, setOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale);

    localStorage.setItem("fontScale", fontScale);
  }, [fontScale]);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  function increase() {
    setFontScale((prev) => Math.min(prev + 0.05, 1.6));
  }

  function decrease() {
    setFontScale((prev) => Math.max(prev - 0.05, 0.7));
  }

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "14px 20px",
        position: "sticky",
        top: 0,
        background: "var(--bg)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo">Jonathan Cesar</div>

        <div
          style={{
            display: "flex",
            gap: 18,
            position: "relative",
          }}
          ref={ref}
        >
          <button className="btn-font" onClick={() => setOpen(!open)}>
            Aa
          </button>

          {open && (
            <div className="font-menu">
              <div className="font-row">
                <button className="font-btn" onClick={decrease}>
                  –
                </button>

                <span>{(fontScale * 100).toFixed(0)}%</span>

                <button className="font-btn" onClick={increase}>
                  +
                </button>
              </div>

              <input
                type="range"
                min="0.7"
                max="1.6"
                step="0.05"
                value={fontScale}
                onChange={(e) => setFontScale(Number(e.target.value))}
                className="font-range"
              />
            </div>
          )}

          <button
            className="btn"
            onClick={() => setDark(!dark)}
            style={{
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            {dark ? (
              <i class="bi bi-brightness-high"></i>
            ) : (
              <i class="bi bi-moon-fill"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
