import { useState,useEffect } from "react"

export default function ScrollControl(){

  const [speed,setSpeed] = useState(0)

  useEffect(()=>{

    let interval

    if(speed>0){

      interval = setInterval(()=>{

        window.scrollBy(0,1)

      },speed)

    }

    return ()=>clearInterval(interval)

  },[speed])

  return(

    <div style={{margin:"16px 0"}}>

      rolagem:

      <input

        type="range"

        min="0"

        max="40"

        onChange={e=>setSpeed(e.target.value)}

      />

    </div>

  )

}