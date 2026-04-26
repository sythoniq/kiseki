import App from '../App.jsx'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Posts from '../components/Posts.jsx'
import Post from '../components/PostPage.jsx'
import Loading from '../components/Loading.jsx'

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

async function postLoader(postId) {
  const res = await fetch(API+`/posts/${postId}`) 
  const data = await res.json()
  if (data.success) {
    return data.post;
  } else {
    throw new Error("Database error", { status: 404 })
  }
}

async function getPostComments(postId) {
  const res = await fetch(API+`/posts/${postId}/comments`)
  const data = await res.json()
  if (data.success) {
    return data.comments
  } else {
    throw new Error("Database error", { status: 404 })
  }
}

async function fullyLoadPost({params}) {
  const [ post, comments ] = await Promise.all([
    postLoader(params.postId),
    getPostComments(params.postId)
  ])
  return { post, comments }
}

const routes = [
  {
    path: "/",
    element: <App />,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, element: <Posts />, loader: postsLoader },
      { path: "posts/:postId", element: <Post />, loader: fullyLoadPost}
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
