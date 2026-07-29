import { Outlet } from 'react-router'
import NavBar from './components/nav/NavBar'

function App() {
  return (
    <>
      <p>Salut c'est Quill</p>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
