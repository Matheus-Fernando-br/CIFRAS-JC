import { useState,useEffect } from "react"

export default function ScrollControl(){

  const [speed,setSpeed] = useState(0)

  const [open,setOpen] = useState(false)


  useEffect(()=>{

    let interval

    if(speed > 0){

      const delay = 45 - speed

      interval = setInterval(()=>{

        window.scrollBy(0,1)

      },delay)

    }

    return ()=>clearInterval(interval)

  },[speed])


  return(

    <div className={`scroll-box ${open ? "open" : ""}`}>

      <button

        className="scroll-btn"

        onClick={()=>setOpen(!open)}

      >

        ⏬

      </button>


      {open &&(

        <div className="scroll-panel">

          Velocidade
          
          <input

            type="range"

            min="0"

            max="40"

            value={speed}

            onChange={e=>setSpeed(Number(e.target.value))}

          />

        </div>

      )}

    </div>

  )

}