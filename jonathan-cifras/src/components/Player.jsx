export default function Player({ src }) {
  if (!src) return null;

  return (
    <audio
      controls
      preload="metadata"
      className="player"
    >
      <source src={src} type="audio/mpeg" />
      Seu navegador não suporta áudio
    </audio>
  );
}
