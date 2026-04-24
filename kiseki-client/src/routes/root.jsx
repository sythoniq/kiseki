import App from '../App.jsx'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Posts from '../components/Posts.jsx'
import Post from '../components/PostPage.jsx'

const API = import.meta.env.VITE_BASE_API_URL

async function postsLoader() {
  try {
    const res = await fetch(API+'/posts');
    const data = await res.json()
    if (data.success) {
      return data.posts;
    } else {
      throw new Error("Database error", {status: 404});    
    }
  } catch (err) {
    throw new Error("Server error", {status: 500})
  }
}

async function postLoader({params}) {
  const res = await fetch(API+`/posts/${params.postId}`) 
  const data = await res.json()
  if (data.success) {
    return data.post;
  } else {
    throw new Error("Database error", { status: 404 })
  }
}

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Posts />, loader: postsLoader },
      { path: "posts/:postId", element: <Post />, loader: postLoader}
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
