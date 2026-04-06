import { songs } from "../data/songs"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Home(){

  const [search,setSearch] = useState("")

  const filtered = songs.filter(song=>

    song.title.toLowerCase().includes(search.toLowerCase())

  )

  return(

    <div className="container fade">

      <input

        placeholder="🔎 Buscar música..."

        className="search"

        value={search}

        onChange={e=>setSearch(e.target.value)}

        style={{marginBottom:20}}

      />

      {filtered.map(song=>(

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

      ))}

    </div>

  )

}