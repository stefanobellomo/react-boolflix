import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const api_key = import.meta.env.VITE_MOVIE_API_KEY

  const [api, setApi] = useState([])
  const [input, setInput] = useState('')

  function getApi() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=il+signore+degli+anelli`)
      .then(res => (
        setApi(res.data.results)
      ))
  }

  console.log(api);

  useEffect((getApi), [])

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter> */}
      <div className='container'>
        <input type="search" name="" id="" onChange={(e) => setInput(e.target.value)} />
        <button className='btn btn-primary'>search</button>
      </div>


      {api.map((film) => (
        <div key={film.id}>
          <p>{film.title}</p>
          <p>{film.release_date}</p>
          <p>{film.original_language}</p>
          <p>{film.vote_average}</p>
        </div>
      ))}

    </>
  )
}

export default App
