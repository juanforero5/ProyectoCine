import { useEffect, useState } from 'react';
import { router, supabase } from "../main";
import { Movie, MovieFunction, Ticket } from '../types';
import { useLocation } from 'react-router-dom';
import { SEAT_IDS } from '../types/constants';

// ID de la funcion y la silla del ticket
type FunctionTicketsMap = Record<number, Ticket['seat_id'][]>

async function persistTickets(function_id: number, ts: string[]) {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.log(error, 'persistTickets')
    return
  }

  if (!user) {
    console.log('No hay usuario')
    return
  }

  const { error: insertE } = await supabase.from('Tickets').insert(ts.map(t => (
    {
      function_id,
      seat_id: t,
      user_id: user.id,
    }
  )))

  if (insertE) {
    console.log(insertE)
    return
  }

  router.navigate('/my-tickets')
}

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

  const buyTickets = (f: number) => {
    if (selectedTickets.length === 0) {
      alert('No hay tickets seleccionados')
      return
    }

    persistTickets(f, selectedTickets)
  }

  useEffect(() => {
    getMovieDetails()
  }, [])

  return (
    <>
      {!movie ?
        (<>Cargando detalles de la pelicula...</>) :
        (<>
          <h1 className='mb-5'>{movie.title}</h1>
        </>)
      }
      {!movieFunctions || movieFunctions.length === 0 ?
        (<>Cargando detalles de la pelicula...</>) :
        (<>
          {movieFunctions.map(mf => (
            <div key={mf.id}>
              <div className='flex flex-col gap-4'>
                <h2 className='text-3xl'>Funciones</h2>
                <h3>{mf.room_name}, {mf.date} - {mf.time} - Jardin Plaza</h3>

                <div className='flex gap-4'>
                  <div className='w-1/2 grid grid-cols-10 gap-2'>
                    {SEAT_IDS.map(id => (
                      <button key={id} className={
                        `p-1 px-2
                        ${selectedTickets.includes(id) && 'bg-yellow-600'}
                        ${movieTickets[mf.id]?.includes(id) && 'bg-red-600/20'}`}
                        onClick={() => selectTicket(id)}
                        disabled={movieTickets[mf.id]?.includes(id)}>{id}</button>
                    ))}
                  </div>
                  <div className='w-1/2 flex flex-col gap-2'>
                    <button className='p-2 px-2 pointer-events-none w-1/4'>Disponibles</button>
                    <button className='p-2 px-2 pointer-events-none w-1/4 bg-red-600/20'>Ocupados</button>
                    <button className='p-2 px-2 pointer-events-none w-1/4 bg-yellow-600'>Seleccionados</button>
                    <button className='p-2ß px-2 pointer-events-none w-1/4 bg-emerald-600'>Míos</button>
                    <button className='mt-auto' onClick={() => buyTickets(mf.id)}>Comprar</button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </>)
      }
    </>
  );
};
