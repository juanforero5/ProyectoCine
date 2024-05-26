import { useEffect } from 'react'
import { router, supabase } from './main'
import { Outlet, useLocation } from 'react-router-dom'



function App() {
  const location = useLocation()

  useEffect(() => {
    const check = async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (session === null && location.pathname != '/') {
        console.log(location.pathname)
        router.navigate('/')
        return
      }


    }
    check()
  }, [])
  return (
    <Outlet></Outlet>
  )
}

export default App
