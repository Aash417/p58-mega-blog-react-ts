import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { login, logout } from './app/authSlice';
import { useAppDispatch } from './app/hook';
import authService from './appwrite/auth';
import { Footer, Header } from './components';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
		<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
			<div className='w-full block'>
				<Header />
				<main>
					TODO: <Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App;
