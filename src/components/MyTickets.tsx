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
      <h1>
        Mis Tickets
      </h1>

      <ul>
        {myTickets.map(t => (
          <li key={t.id}>
            <h2>{t.Functions.Movies.title}</h2>
            <div>Sala: {t.Functions.room_name}</div>
            <div>
            {t.seat_id} - {t.Functions.date} - {t.Functions.time}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
