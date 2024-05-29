import { useEffect, useState } from 'react'
import { router, supabase } from './main'
import { Link, Outlet, useLocation } from 'react-router-dom'


function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const check = async () => {
      const session = (await supabase.auth.getSession()).data.session
      setLoggedIn(session !== null)
      if (session === null && location.pathname != '/' && location.pathname != '/cerrar' && location.pathname != '/about') {
        console.log(location.pathname)
        router.navigate('/')
        return
      }
    }
    check()
  }, [location.pathname])

  return (
    <>
      {loggedIn &&
        (<nav className='flex gap-5 p-6 py-8 justify-end bg-neutral-700 sticky top-0'>
          <Link className='text-gray-400 font-semibold text-xl' to={'/movies'}>Peliculas</Link>
          <Link className='text-gray-400 font-semibold text-xl' to={'/my-tickets'}>Mis tickets</Link>
          <Link className='text-gray-400 font-semibold text-xl' to={'/cerrar'}>Cerrar sesión</Link>
        </nav>)}
      <div className='px-14 py-6'>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
