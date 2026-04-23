import App from '../App.jsx'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]

export default routes;
