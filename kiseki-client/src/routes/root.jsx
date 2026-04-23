import App from '../App.jsx'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Posts from '../components/Posts.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Posts />
      }
    ]
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
