import { useState,useEffect } from "react"

export default function Header(){

  const [dark,setDark] = useState(

    localStorage.getItem("theme") === "dark"

  )

  useEffect(()=>{

    if(dark){

      document.body.classList.add("dark")

      localStorage.setItem("theme","dark")

    }

    else{

      document.body.classList.remove("dark")

      localStorage.setItem("theme","light")

    }

  },[dark])

  return(

    <header

      style={{

        borderBottom:"1px solid var(--border)",

        padding:"14px 20px",

        position:"sticky",

        top:0,

        background:"var(--bg)",

        zIndex:10

      }}

    >

      <div

        style={{

          display:"flex",

          justifyContent: "space-between",

          alignItems:"center",

          gap:12

        }}

      >

        <div className="logo">

          Jonathan Cesar

        </div>


          <button

            className="btn"

            onClick={()=>setDark(!dark)}

            style={{

              width:42,

              height:42,

              display:"flex",

              alignItems:"center",

              justifyContent:"center",

              fontSize:18

            }}

          >

            {dark ? "☀️" : "🌙"}

          </button>

      </div>

    </header>

  )

}