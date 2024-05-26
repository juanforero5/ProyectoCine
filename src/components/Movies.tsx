import { useEffect, useState } from 'react';
import { supabase } from "../main";
import { Movie } from '../types';
import { Link } from 'react-router-dom';

const getMovies = async () => {
  return await supabase.from('Movies').select('*');
}
export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then(r => {
      const {data, error} = r
      if (error) {
        return
      }

      setMovies(data)
    })
  }, [])
  return (
    <>
      <h1>
        Movies
      </h1>

      <ul>
          {movies.map(m => (
            <li key={m.id}>
              <Link to={m.id+''} >
                <h2>{m.title}</h2>
              </Link>
              <div>{m.synopsis}</div>
            </li>
          ))}
      </ul>
    </>
  );
};
