
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Table from './components/Table'

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Table />,
    },
    {
      path:'/:id',
      element: <Table />
    }
  ])




  return (
    <RouterProvider router={routes} />
  )
}

export default App