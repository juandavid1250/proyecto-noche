import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function App() {
  const [roles, setRoles] = useState([])
  const [status, setStatus] = useState('Cargando roles...')

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch(`${API_BASE_URL}/roles`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()
        setRoles(data)
        setStatus(data.length > 0 ? 'Roles cargados' : 'No hay roles disponibles')
      } catch (error) {
        setStatus(`Error de conexión: ${error.message}`)
      }
    }

    fetchRoles()
  }, [])

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>IUTEDE Frontend</h1>
        <p>API: <code>{API_BASE_URL}</code></p>
      </header>

      <main className="app-main">
        <section className="panel">
          <h2>Estado de la conexión</h2>
          <p>{status}</p>
        </section>

        <section className="panel">
          <h2>Roles</h2>
          {roles.length > 0 ? (
            <ul>
              {roles.map((rol) => (
                <li key={rol.id_rol}>{rol.nombre_rol}</li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron roles.</p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
