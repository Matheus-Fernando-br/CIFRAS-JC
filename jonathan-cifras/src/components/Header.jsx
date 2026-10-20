import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/LOGO.png" alt="" />
          <div className="logo-text">
            <span className="logo-name">Jonathan César</span>
            <span className="logo-sub">Cifras</span>
          </div>
        </Link>

        <div className="header-actions" ref={ref}>
          <button
            className={`icon-btn ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            title="Tamanho da fonte"
          >
            Aa
          </button>

          {open && (
            <div className="font-menu">
              <div className="font-menu-title">Tamanho da fonte</div>
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
            className="icon-btn"
            onClick={() => setDark(!dark)}
            title={dark ? "Modo claro" : "Modo escuro"}
          >
            {dark ? (
              <i className="bi bi-brightness-high"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
