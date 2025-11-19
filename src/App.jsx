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

  const [everyOpere, setEveryOpere] = useState([])
  const [results, setResults] = useState(everyOpere)


  useEffect(() => {
    setEveryOpere([...film, ...series]
    )
  }, [film, series])

  function handleClick() {
    const filteredOpere = everyOpere.filter(opera => (opera.title || opera.name).toLowerCase().includes(input))
    setResults(filteredOpere)
  }

  function getStars(vote) {
    const stars = []
    const decVote = Math.ceil(vote / 2)
    const numbs = [1, 2, 3, 4, 5]

    numbs.forEach(numb => {
      if (numb <= decVote) {
        stars.push('★')
      } else {
        stars.push('☆')
      }
    })
    return stars.join('')
  }

  console.log(results);

  return (
    <>
      <div className='container'>
        <input type="search" value={input} id="" onChange={(e) => setInput(e.target.value)} />
        <button className='btn btn-primary' onClick={handleClick}>search</button>
      </div>

      {results.map((film) => (
        <div key={film.id}>
          <p>{film.title || film.name}</p>
          <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="" />
          <p>{film.release_date}</p>
          <p>{film.original_language === 'it' ? <img width='25px' src={ita}></img> : film.original_language}</p>
          <p>{getStars(film.vote_average)}</p>
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