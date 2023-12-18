import { useEffect, useState } from 'react';
import './App.css';
import { Footer, Header } from './components/index';
import { useAppDispatch } from './app/hook';
import authservice from './appwrite/auth';
import { login, logout } from './app/authSlice';
import { Outlet } from 'react-router-dom';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		authservice
			.getCurrentUser()
			.then((userData) => {
				if (!userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, [dispatch]);

	if (loading) return <div className=''>loading</div>;

	return (
		<div className='min-h-screen flex flex-wrap content-between'>
			<div className='w-full block'>
				<main>
					{/* <Outlet /> */}
					blog app
				</main>
			</div>
		</div>
	);
}

export default App;
