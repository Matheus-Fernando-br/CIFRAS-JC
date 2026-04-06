import { songs } from "../data/songs"
import { Link } from "react-router-dom"
import { useState,useEffect,useRef } from "react"

export default function Home(){

  const [search,setSearch] = useState("")

  const [filterOpen,setFilterOpen] = useState(false)

  const [category,setCategory] = useState(
    localStorage.getItem("filterCategory") || "all"
  )

  const [sort,setSort] = useState(
    localStorage.getItem("filterSort") || "az"
  )

  const [tone,setTone] = useState(
    localStorage.getItem("filterTone") || "all"
  )

  const ref = useRef()


  useEffect(()=>{

    localStorage.setItem("filterCategory",category)
    localStorage.setItem("filterSort",sort)
    localStorage.setItem("filterTone",tone)

  },[category,sort,tone])


  useEffect(()=>{

    function close(e){

      if(ref.current && !ref.current.contains(e.target)){

        setFilterOpen(false)

      }

    }

    document.addEventListener("click",close)

    return ()=> document.removeEventListener("click",close)

  },[])


  const tones = [...new Set(songs.map(s=>s.tone))]


  let filtered = songs.filter(song=>

    song.title.toLowerCase().includes(search.toLowerCase())

  )


  if(category !== "all"){

    filtered = filtered.filter(

      song=>song.category === category

    )

  }


  if(tone !== "all"){

    filtered = filtered.filter(

      song=>song.tone === tone

    )

  }


  if(sort === "az"){

    filtered.sort((a,b)=>

      a.title.localeCompare(b.title)

    )

  }


  if(sort === "za"){

    filtered.sort((a,b)=>

      b.title.localeCompare(a.title)

    )

  }



  const agitadas = filtered.filter(

    s=>s.category === "agitada"

  )

  const espirituais = filtered.filter(

    s=>s.category === "espiritual"

  )


  const filterActive =

    category !== "all" ||

    tone !== "all" ||

    sort !== "az"



  function Card(song){

    return(

      <Link

        to={`/song/${song.id}`}

        key={song.id}

        style={{textDecoration:"none"}}

      >

        <div className="card">

          <div className="song-title">

            {song.title}

          </div>

          <div className="song-tone">

            Tom original: {song.tone}

          </div>

        </div>

      </Link>

    )

  }



  return(

    <div className="container fade">

      {/* busca + filtro */}

      <div className="search-row">

        <input

          placeholder="🔎 Buscar música..."

          className="search"

          value={search}

          onChange={e=>setSearch(e.target.value)}

        />


        <div ref={ref} style={{position:"relative"}}>

          <button

            className="btn"

            style={{

              background: filterActive

                ? "var(--primary)"

                : "var(--second)"

            }}

            onClick={()=>setFilterOpen(!filterOpen)}

          >

            ⚙️

          </button>



          {filterOpen &&(

            <div className="filter-menu">

              <div className="filter-section">

                <h2>Filtros</h2>

                <div className="filter-title">

                  Categoria

                </div>

                <button

                className={category === "all" ? "active" : ""}

                onClick={()=>setCategory("all")}

                >
                Todas
                </button>



                <button

                className={category === "agitada" ? "active" : ""}

                onClick={()=>setCategory("agitada")}

                >
                Agitadas
                </button>



                <button

                className={category === "espiritual" ? "active" : ""}

                onClick={()=>setCategory("espiritual")}

                >
                Espirituais
                </button>

              </div>



              <div className="filter-section">

                <div className="filter-title">

                  Ordem

                </div>

                <button

                className={sort === "az" ? "active" : ""}

                onClick={()=>setSort("az")}

                >
                A → Z
                </button>


                <button

                className={sort === "za" ? "active" : ""}

                onClick={()=>setSort("za")}

                >
                Z → A
                </button>

              </div>



              <div className="filter-section">

                <div className="filter-title">

                  Tom

                </div>

                <select

                  value={tone}
                  style={{padding:10}}
                  onChange={e=>setTone(e.target.value)}

                >

                  <option value="all">
                    Todos
                  </option>

                  {tones.map(t=>(

                    <option key={t}>
                      {t}
                    </option>

                  ))}

                </select>

              </div>


              <button

                className="btn-clear"

                onClick={()=>{

                  setCategory("all")
                  setSort("az")
                  setTone("all")

                }}

              >

                Limpar

              </button>


            </div>

          )}

        </div>

      </div>



      {/* AGITADAS */}

      {agitadas.length > 0 &&(

        <>

          <h2 className="section-title">

            🔥 Agitadas

          </h2>
          <hr />

          {agitadas.map(Card)}

        </>

      )}



      {/* ESPIRITUAIS */}

      {espirituais.length > 0 &&(

        <>

          <h2 className="section-title">

            🙏 Espirituais

          </h2>
          <hr />

          {espirituais.map(Card)}

        </>

      )}


    </div>

  )

}