const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]

export default function ToneControls({tone,setTone}){

  function changeTone(step){

    let index = notes.indexOf(tone)

    let newIndex = (index + step + 12) % 12

    setTone(notes[newIndex])

  }

  return(

    <div>

      <button onClick={()=>changeTone(-1)}>
        -
      </button>

      <span style={{margin:"0 10px"}}>
        Tom: {tone}
      </span>

      <button onClick={()=>changeTone(1)}>
        +
      </button>

    </div>

  )

}