import { useEffect, useState } from 'react';
import { supabase } from "../main";
import { Movie, MovieFunction, Ticket } from '../types';
import { useLocation } from 'react-router-dom';
import { SEAT_IDS } from '../types/constants';

// ID de la funcion y la silla del ticket
type FunctionTicketsMap = Record<number, Ticket['seat_id'][]>

export const MovieDetails = () => {
  const location = useLocation()
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieFunctions, setMovieFunctions] = useState<MovieFunction[] | null>(null);
  const [movieTickets, setMovieTickets] = useState<FunctionTicketsMap>({});
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])

  const getMovieDetails = async () => {
    const movieId = location.pathname.split('/').reverse()[0]
    const { data, error } = await supabase.from('Movies').select('*').eq('id', movieId).single();
    if (error) { return }
    setMovie(data)

    const { data: functionsData, error: functionsError } = await supabase.from('Functions')
      .select('*').eq('movie_id', movieId);
    if (functionsError) { return }
    setMovieFunctions(functionsData)

    functionsData.forEach(async fd => {
      const { data, error } = await supabase.from('Tickets').select('*').eq('function_id', fd.id)
      if (error) return;

      setMovieTickets(current => ({ ...current, [fd.id]: data.map(t => t.seat_id) }))
    })
  }

  const selectTicket = (seatId: string) => {
    setSelectedTickets(prevSelectedTickets => {
      if (prevSelectedTickets.includes(seatId)) {
        return prevSelectedTickets.filter(ticket => ticket !== seatId);
      } else {
        return [...prevSelectedTickets, seatId];
      }
    });
  }

  const buyTickets = () => {
    if (selectedTickets.length === 0) {
      alert('No hay tickets seleccionados')
      return
    }


  }

  useEffect(() => {
    getMovieDetails().then(r => console.log(movieTickets))
  }, [])

  return (
    <>
      {!movie ?
        (<>Cargando detalles de la pelicula...</>) :
        (<>
          <h1>{movie.title}</h1>
        </>)
      }
      {!movieFunctions || movieFunctions.length === 0 ?
        (<>Cargando detalles de la pelicula...</>) :
        (<>
          {movieFunctions.map(mf => (
            <div key={mf.id}>
              <div>
                <h2>Funciones</h2>
                <h3>{mf.room_name}, {mf.date} - {mf.time} - Jardin Plaza</h3>

                <div className='grid-container'>
                  {SEAT_IDS.map(id => (
                    <button key={id} className={`${selectedTickets.includes(id) && 'selected-seat'}`}
                      onClick={() => selectTicket(id)}
                      disabled={movieTickets[mf.id]?.includes(id)}>{id}</button>
                  ))}
                </div>
              </div>

              <button onClick={buyTickets}>Comprar</button>
            </div>
          ))}
        </>)
      }
    </>
  );
};
