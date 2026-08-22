import App from '../App.jsx'
import Content from '../components/content/Content.jsx'
import Login from '../components/login/Login.jsx'
import Register from '../components/register/Register.jsx'

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
				path: "/login",
				element: <Login />
			},
			{
				path: "/register",
				element: <Register />
			}
		]
	}
]

export default routes
