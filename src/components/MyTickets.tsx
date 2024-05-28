import { useEffect, useState } from 'react';
import { supabase } from "../main";
import { MovieFunction, Ticket } from '../types';

const getTickets = async () => {
  const { data: { user }, error: uError } = await supabase.auth.getUser()
  if (uError) {
    console.log(uError, 'persistTickets')
    return
  }

  if (!user) {
    console.log('No hay usuario')
    return
  }

  return await supabase.from('Tickets').select(`
    *,
    Functions ( date, time, room_name, Movies ( title ) )
    `).eq('user_id', user.id);
}

type CompositeTicket = Ticket & { Functions: MovieFunction & { Movies: {title: string}} }
export const MyTickets = () => {
  const [myTickets, setMyTickets] = useState<CompositeTicket[]>([]);

  useEffect(() => {
    getTickets().then(r => {
      if (!r) {
        return
      }

      const { data, error } = r
      if (error) {
        console.log(error)
        return
      }

      setMyTickets(data as CompositeTicket[])
    })
  }, [])
  return (
    <>
      <h1 className='mb-5'>
        Mis Tickets
      </h1>

      <ul className='flex flex-wrap gap-5'>
        {myTickets.map(t => (
          <li key={t.id} className='p-6 rounded-md border border-solid border-white'>
            <div>{t.Functions.Movies.title}</div>
            <div className='text-center text-4xl font-semibold mt-3'>
              {t.seat_id}
            </div>
            <div className='text-center mb-3'>{t.Functions.room_name}</div>
            <div>
            {t.Functions.date} - {t.Functions.time}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
