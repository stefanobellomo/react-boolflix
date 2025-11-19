import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import ita from './assets/ita_flags.jpeg'
import { useEffect, useState } from 'react'

function App() {

  const api_key = import.meta.env.VITE_MOVIE_API_KEY

  const [input, setInput] = useState('')
  const [film, setFilm] = useState([])
  const [series, setSeries] = useState([])


  function getFilmSeries() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=matrix`)
      .then(resFilm => {
        setFilm(resFilm.data.results)
      })
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=scrubs`)
      .then(resSeries => {
        setSeries(resSeries.data.results)
      })
  }

  useEffect(getFilmSeries, [])
  console.log(film);

  const [everyOpere, setEveryOpere] = useState([])
  const [results, setResults] = useState(everyOpere)


  useEffect(() => {
    setEveryOpere([...film, ...series]
    )
    console.log(everyOpere);
  }, [film, series])

  function handleClick() {
    const filteredOpere = everyOpere.filter(opera => (opera.title || opera.name).toLowerCase().includes(input))
    setResults(filteredOpere)
  }

  return (
    <>
      <div className='container'>
        <input type="search" value={input} id="" onChange={(e) => setInput(e.target.value)} />
        <button className='btn btn-primary' onClick={handleClick}>search</button>
      </div>

      {results.map((film) => (
        <div key={film.id}>
          <p>{film.title || film.name}</p>
          <p>{film.release_date}</p>
          <p>{film.original_language === 'it' ? <img width='25px' src={ita}></img> : film.original_language}</p>
          <p>{film.vote_average}</p>
        </div>
      ))}
    </>
  )
}

export default App

// <BrowserRouter>
//   <Routes>
//     <Route></Route>
//   </Routes>
// </BrowserRouter>