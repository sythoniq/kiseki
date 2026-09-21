import App from '../App.jsx'
import Content from '../components/content/Content.jsx'
import Post from '../components/post/Post.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'

import Author from '../components/author/Author.jsx'
import Index from '../components/author/index/Index.jsx'
import PostPage from '../components/author/content/Content.jsx'
import New from '../components/author/new/New.jsx'
import Edit from '../components/author/edit/Edit.jsx'

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Content />
			},
			{
				path: "/posts/:postId",
				element: <Post />
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
	},
	{
		path: "/author",
		element: <Author />,
		children: [
			{
				index: true,
				element: <Index />
			},
			{
				path: "/author/posts/:postId",
				element: <PostPage />
			},
			{
				path: "/author/new",
				element: <New />
			},
			{
				path: "/author/posts/:postId/edit",
				element: <Edit />
			}
		]
	}
]

export default routes
