import { useEffect } from 'react'
import { router, supabase } from './main'
import { Link, Outlet, useLocation } from 'react-router-dom'

const navStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  background: '#ccc',
  padding: '16px',
  paddingTop: '32px',
  paddingBottom: '32px',
  justifyContent: 'flex-end'
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const check = async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (session === null && location.pathname != '/' && location.pathname != '/cerrar') {
        console.log(location.pathname)
        router.navigate('/')
        return
      }


    }
    check()
  }, [location.pathname])
  return (
    <>
      <nav style={navStyles}>
       <Link to={'/movies'}>Peliculas</Link>
       <Link to={'/my-tickets'}>Mis Tickets</Link>
       <Link to={'/cerrar'}>Cerrar Sesión</Link>
      </nav>
      <div style={{paddingRight: '50px', paddingLeft: '50px'}}>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
