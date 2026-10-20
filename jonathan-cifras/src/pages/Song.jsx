import { useParams, Link } from "react-router-dom";
import { songs } from "../data/songs";
import { useState } from "react";

import Player from "../components/Player";
import ScrollControl from "../components/ScrollControl";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function transposeChord(chord, step) {
  let match = chord.match(/[A-G]#?/);

  if (!match) return chord;

  let root = match[0];

  let index = notes.indexOf(root);

  let newIndex = (index + step + 12) % 12;

  return chord.replace(root, notes[newIndex]);
}

function transposeLyrics(text, step) {
  return text.replace(/\[([^\]]+)\]/g, (match, chord) => {
    return `<span class="chord"><span class="br">[</span>${transposeChord(chord, step)}<span class="br">]</span></span>`;
  });
}

export default function Song() {
  const { id } = useParams();

  const song = songs.find((s) => s.id === id);

  const [step, setStep] = useState(0);

  const currentToneIndex = (notes.indexOf(song.tone) + step + 12) % 12;

  const currentTone = notes[currentToneIndex];

  function change(value) {
    setStep(step + value);
  }
  const newLyrics = transposeLyrics(song.chords, step);

  return (
    <div className="container fade">
      <Link to="/" className="back">
        <i className="bi bi-chevron-left"></i> Voltar
      </Link>

      <div className="song-card">
        <div className="song-header">
          <h2>{song.title}</h2>
          <span className="song-artist">Jonathan César</span>
        </div>

        <Player src={song.audio} />

        <div className="song-toolbar">
          <div className="tone-label">
            Tom: <span key={currentTone}>{currentTone}</span>
          </div>

          <button className="btn-tom" onClick={() => change(-1)}>
            <i className="bi bi-dash-lg"></i> Diminuir Tom
          </button>

          <button className="btn-tom" onClick={() => change(1)}>
            <i className="bi bi-plus-lg"></i> Aumentar Tom
          </button>
        </div>

        <pre dangerouslySetInnerHTML={{ __html: newLyrics }} />
      </div>

      <ScrollControl />
    </div>
  );
}
