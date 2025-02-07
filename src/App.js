import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieDeatils from "./components/MovieDeatils";

function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);


  //get all movies
  const getAllmovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=a650538ed85cd58755b9f7738fef23fb&language=en"
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages)
  };
  useEffect(() => {
    getAllmovies();
  }, []);
//get current page 
  const getPage= async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a650538ed85cd58755b9f7738fef23fb&language=en&page=${page}`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages)
  };

  ///search
  const search = async (word) => {
    if (word === "") {
      getAllmovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=a650538ed85cd58755b9f7738fef23fb&query=${word}&language=en`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages)
    }
  };
  return (
    <div className="color-body">
      <NavBar search={search} />
      <Container>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<MovieList movies={movies} getPage={getPage}  pageCount={pageCount}/>}/>
      <Route path="/movie/:id" element={<MovieDeatils/>}/>
        
        </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
