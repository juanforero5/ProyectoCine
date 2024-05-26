import { useEffect } from 'react'
import { supabase } from './main'
import { Login } from './components/Login'
import { Movies } from './components/Movies';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
]);

function App() {

  useEffect(() => {
    const check = async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (session === null)
        router.navigate('/')
    }
    check()
  }, [])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
