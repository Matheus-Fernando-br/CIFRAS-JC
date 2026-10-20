import { songs } from "../data/songs";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);

  const [category, setCategory] = useState(
    localStorage.getItem("filterCategory") || "all",
  );

  const [sort, setSort] = useState(localStorage.getItem("filterSort") || "az");

  const [tone, setTone] = useState(localStorage.getItem("filterTone") || "all");

  const ref = useRef();

  useEffect(() => {
    localStorage.setItem("filterCategory", category);
    localStorage.setItem("filterSort", sort);
    localStorage.setItem("filterTone", tone);
  }, [category, sort, tone]);

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setFilterOpen(false);
      }
    }

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);
  }, []);

  const tones = [...new Set(songs.map((s) => s.tone))];

  let filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (category !== "all") {
    filtered = filtered.filter((song) => song.category === category);
  }

  if (tone !== "all") {
    filtered = filtered.filter((song) => song.tone === tone);
  }

  if (sort === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "za") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  const agitadas = filtered.filter((s) => s.category === "agitada");

  const espirituais = filtered.filter((s) => s.category === "espiritual");

  const filterActive = category !== "all" || tone !== "all" || sort !== "az";

  function Card(song, index) {
    return (
      <Link to={`/song/${song.id}`} key={song.id} className="song-link">
        <div className="card" style={{ animationDelay: `${index * 0.04}s` }}>
          <div className="song-rank">{index + 1}</div>

          <div className="song-info">
            <div className="song-title">{song.title}</div>

            <div className="song-tone">
              Tom original: <b>{song.tone}</b>
            </div>
          </div>

          <i className="bi bi-chevron-right arrow"></i>
        </div>
      </Link>
    );
  }

  return (
    <div className="container fade">
      {/* busca + filtro */}

      <div className="hero">
        <h1>Cifras Jonathan César</h1>
        <p>Acordes, tons e áudios para tocar no louvor.</p>

      <div className="search-row">
        <div className="search-wrap">
          <i className="bi bi-search"></i>
          <input
            placeholder="Buscar música..."
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div ref={ref} style={{ position: "relative" }}>
          <button
            className={`filter-btn ${filterActive ? "active" : ""}`}
            title="Filtros"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <i className="bi bi-funnel-fill"></i>
          </button>

          {filterOpen && (
            <div className="filter-menu">
              <div className="filter-section">
                <h2>Filtros</h2>

                <div className="filter-title"><i className="bi bi-file-earmark"></i> Categoria</div>
                <hr />
                <button
                  className={category === "all" ? "active" : ""}
                  onClick={() => setCategory("all")}
                >
                  Todas
                </button>

                <button
                  className={category === "agitada" ? "active" : ""}
                  onClick={() => setCategory("agitada")}
                >
                  Agitadas
                </button>

                <button
                  className={category === "espiritual" ? "active" : ""}
                  onClick={() => setCategory("espiritual")}
                >
                  Espirituais
                </button>
              </div>

              <div className="filter-section">
                <div className="filter-title"><i className="bi bi-list-ul"></i> Ordem</div>
                <hr />
                <button
                  className={sort === "az" ? "active" : ""}
                  onClick={() => setSort("az")}
                >
                  A → Z
                </button>

                <button
                  className={sort === "za" ? "active" : ""}
                  onClick={() => setSort("za")}
                >
                  Z → A
                </button>
              </div>

              <div className="filter-section">
                <div className="filter-title"><i className="bi bi-megaphone"></i> Tom</div>
                <hr />
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="all">Todos</option>

                  {tones.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                className="btn-clear"
                onClick={() => {
                  setCategory("all");
                  setSort("az");
                  setTone("all");
                }}
              >
                Limpar
              </button>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* AGITADAS */}

      {agitadas.length > 0 && (
        <section className="section">
          <h2 className="section-title">
            <i className="bi bi-fire"></i> Agitadas
            <span className="count">{agitadas.length}</span>
          </h2>
          <hr />

          {agitadas.map(Card)}
        </section>
      )}

      {/* ESPIRITUAIS */}

      {espirituais.length > 0 && (
        <section className="section">
          <h2 className="section-title">
            <i className="bi bi-arrow-through-heart"></i> Espirituais
            <span className="count">{espirituais.length}</span>
          </h2>
          <hr />

          {espirituais.map(Card)}
        </section>
      )}

      {agitadas.length === 0 && espirituais.length === 0 && (
        <div className="section empty">Nenhuma música encontrada.</div>
      )}
    </div>
  );
}
