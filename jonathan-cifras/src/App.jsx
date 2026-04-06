import { useState } from "react"

import { BrowserRouter,Routes,Route } from "react-router-dom"

import Home from "./pages/Home"
import Song from "./pages/Song"

import Header from "./components/Header"

import "./styles/theme.css"

export default function App(){

  const [search,setSearch] = useState("")

  return(

    <BrowserRouter>

      <Header
        search={search}
        setSearch={setSearch}
      />

      <Routes>

        <Route
          path="/"
          element={<Home search={search}/>}
        />

        <Route
          path="/song/:id"
          element={<Song/>}
        />

      </Routes>

    </BrowserRouter>

  )

}