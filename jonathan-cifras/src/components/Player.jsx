export default function Player({ src }) {
  if (!src) return null;

  return (
    <audio
      controls
      preload="metadata"
      style={{
        width: "100%",
        margin: "10px 0 20px 0",
      }}
    >
      <source src={src} type="audio/mpeg" />
      Seu navegador não suporta áudio
    </audio>
  );
}
