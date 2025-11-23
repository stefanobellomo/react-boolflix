import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactCountryFlag from "react-country-flag";


function App() {

  const api_key = import.meta.env.VITE_MOVIE_API_KEY

  const [input, setInput] = useState('')
  const [film, setFilm] = useState([])
  const [series, setSeries] = useState([])

  const [everyOpere, setEveryOpere] = useState([])
  const [results, setResults] = useState(everyOpere)

  function handleClick() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${input}`)
      .then(resFilm => {
        const films = resFilm.data.results
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${input}`)
          .then(resSeries => {
            const tvSeries = resSeries.data.results

            const all = [...films, ...tvSeries]

            setFilm(films)
            setSeries(tvSeries)
            setEveryOpere(all)
            setResults(all)
          })
      })
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

  const langToCountry = {
    it: "IT",
    en: "GB",
    fr: "FR",
    es: "ES",
    de: "DE",
    ja: "JP",
    ko: "KR",
    zh: "CN",
    ru: "RU",
    pt: "PT",
  };

  function renderFlag(lang) {
    const countryCode = langToCountry[lang];
    if (!countryCode) return lang;
    return (
      <ReactCountryFlag countryCode={countryCode} svg />
    );
  }

  console.log(results);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-primary">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarID">
              <div className="navbar-nav">
                <input type="search" value={input} onChange={(e) => setInput(e.target.value)} />
              </div>
              <button className='btn btn-primary' onClick={handleClick}>search</button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className='container'>
          <div className='row row-cols-3'>

            {results.map((opera) => (
              <div className='col' key={opera.id}>
                <div className='card'>
                  <p>{opera.title || opera.name}</p>
                  <img src={`https://image.tmdb.org/t/p/w342${opera.poster_path}`} alt="" />
                  <p>{opera.release_date || opera.first_air_date}</p>
                  <div className='flags'>{renderFlag(opera.original_language)}</div>
                  <p>{getStars(opera.vote_average)}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </main>

    </>
  )
}

export default App

// <BrowserRouter>
//   <Routes>
//     <Route></Route>
//   </Routes>
// </BrowserRouter>

