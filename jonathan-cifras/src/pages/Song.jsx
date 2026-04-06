import { useParams,Link } from "react-router-dom"
import { songs } from "../data/songs"
import { useState } from "react"

import Player from "../components/Player"
import ScrollControl from "../components/ScrollControl"

const notes = [
"C","C#","D","D#","E","F",
"F#","G","G#","A","A#","B"
]

function transposeChord(chord, step){

  let match = chord.match(/[A-G]#?/)

  if(!match) return chord

  let root = match[0]

  let index = notes.indexOf(root)

  let newIndex = (index + step + 12) % 12

  return chord.replace(root, notes[newIndex])

}

function transposeLyrics(text, step){

  return text.replace(/\[([^\]]+)\]/g,(match,chord)=>{

    return `<span class="chord">[${transposeChord(chord,step)}]</span>`

  })

}

export default function Song(){

  const {id} = useParams()

  const song = songs.find(s=>s.id===id)

  const [step,setStep] = useState(0)

  const currentToneIndex =
    (notes.indexOf(song.tone) + step + 12) % 12

  const currentTone = notes[currentToneIndex]

  function change(value){

    setStep(step + value)

  }
  const newLyrics = transposeLyrics(song.chords,step)

  return(

    <div className="container fade">
      <div style={{textAlign:"center"}}>
        <Link to="/" className="back">

          ← Voltar

        </Link>
      </div>
      <h2>

        {song.title}

      </h2>

      <Player src={song.audio}/>
      <div
        style={{
          marginBottom:10,
          fontWeight:600
        }}
      >

        Tom: {currentTone}

      </div>

      <div
        style={{
          display:"flex",
          justifyContent:"center",
          gap:40,
          marginBottom:10
        }}
      >

        <button
          className="btn-tom"
          onClick={()=>change(-1)}
        >

          Diminuir Tom

        </button>

        <button
          className="btn-tom"
          onClick={()=>change(1)}
        >

          Aumentar Tom

        </button>

      </div>


      <ScrollControl/>

      <pre
        dangerouslySetInnerHTML={{__html:newLyrics}}
      />

    </div>

  )

}