import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = "https://kekkawwcrzbbxevcjhbp.supabase.co"
const PROJECT_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2thd3djcnpiYnhldmNqaGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NzgxODQsImV4cCI6MjAzMjI1NDE4NH0.CjJTx9l69zC4PLFJh25ohnFh7DSamz0IM8jQR7Q3Scc"

export const supabase = createClient(PROJECT_URL, PROJECT_PUBLIC_KEY)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
