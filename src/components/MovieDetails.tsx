import { useEffect, useState } from 'react';
import { supabase } from "../main";
import { Movie } from '../types';
import { useLocation } from 'react-router-dom';

export const MovieDetails = () => {
  const location = useLocation()

  const getMovieDetails = async () => {
    const movieId = location.pathname.split('/').reverse()[0]
    console.log(movieId)
    return await supabase.from('Movies').select('*').eq('id', movieId).single();
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovieDetails().then(r => {
      const { data, error } = r
      if (error) {
        return
      }

      setMovie(data)
    })
  }, [])

  return (
    <>
      {!movie ?
        (<>Cargando detalles de la pelicula...</>) :
        (<>
          {movie.title}
        </>)
      }
    </>
  );
};
