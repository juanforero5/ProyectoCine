import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createClient } from '@supabase/supabase-js'

import { Login, Logout } from './components/Login'
import { Movies } from './components/Movies';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Database } from './types/supabase.ts'
import { MovieDetails } from './components/MovieDetails.tsx'
import { MyTickets } from './components/MyTickets.tsx'
import { About } from './components/About.tsx'

const PROJECT_URL = "https://kekkawwcrzbbxevcjhbp.supabase.co"
const PROJECT_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2thd3djcnpiYnhldmNqaGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NzgxODQsImV4cCI6MjAzMjI1NDE4NH0.CjJTx9l69zC4PLFJh25ohnFh7DSamz0IM8jQR7Q3Scc"

export const supabase = createClient<Database>(PROJECT_URL, PROJECT_PUBLIC_KEY)


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/cerrar",
        element: <Logout />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />
      },
      {
        path: '/my-tickets',
        element: <MyTickets />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
