import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	RouterProvider,
	createBrowserRouter,
	useRouteError,
} from 'react-router-dom';
import { AddPost, AllPosts, EditPost, Home, Post } from '../src/pages/index';
import App from './App.jsx';
import { store } from './app/store';
import { Login, Protected, Signup } from './components/index';
import './index.css';

function MyErrorComponent() {
	const error = useRouteError();

	return (
		<div>
			<h1>Error!</h1>
			<p>An error occurred: {error.message}</p>
			<p>Status code: {error.statusText}</p>
			{/* Add specific error handling or retry logic here */}
		</div>
	);
}
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: (
					<Protected authentication={false}>
						<Login />
					</Protected>
				),
			},
			{
				path: '/signup',
				element: (
					<Protected authentication={false}>
						<Signup />
					</Protected>
				),
			},
			{
				path: '/all-posts',
				element: (
					<Protected authentication>
						<AllPosts />
					</Protected>
				),
			},
			{
				path: '/add-post',
				element: (
					<Protected authentication>
						<AddPost />
					</Protected>
				),
			},
			{
				path: '/edit-post/:slug',
				element: (
					<Protected authentication>
						<EditPost />
					</Protected>
				),
			},
			{
				path: '/post/:slug',
				element: <Post />,
			},
			{
				element: <MyErrorComponent />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
