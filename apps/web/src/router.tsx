import { createBrowserRouter } from 'react-router'
import App from './App'
import { DexiePlayground } from './database/TestDb'
import TableList from './components/tables/TableList'
import HomePage from './pages/Home'
import TableEntries from './components/tables/TableEntries'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/tables',
        element: <TableList />,
      },
      {
        path: 'tables/:id',
        element: <TableEntries />,
      },
    ],
  },
  {
    path: '/test',
    element: <DexiePlayground />,
  },
])

export default router
