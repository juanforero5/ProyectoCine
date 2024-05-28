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
      const { data, error } = r
      if (error) {
        return
      }

      setMovies(data)
    })
  }, [])
  return (
    <>
      <h1 className='mb-5'>
        Movies
      </h1>

      <ul>
        {movies.map(m => (
          <li key={m.id} className='flex gap-10 mb-5'>
            <img src={m.img!} alt="" className='rounded-md h-[350px]' />
            <div>
              <Link to={m.id + ''} >
                <h2 className='text-2xl mb-3'>{m.title}</h2>
              </Link>
              <div>{m.synopsis}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
