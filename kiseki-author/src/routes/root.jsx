import App from '../App.jsx'
import Form from '../components/Form.jsx'
import Home from '../components/Home.jsx'

const API = import.meta.env.VITE_BASE_API_URL;

async function loadPosts() {
  const res = await fetch(API+'/posts');
  const data = await res.json()
  if (data.success) {
    return data.posts
  } else {
    throw new Error("Couldn't fetch posts");
  }
}

const routes = [
{
  path: "/",
  element: <App />,
  children: [
  {
    index: true,
    element: <Home />,
    loader: loadPosts
  } 
]
},
{
  path: "/login",
  element: <Form login={true} />
},
{
  path: "/register",
  element: <Form login={false} />
}
]

export default routes;
