import { logout } from '../app/authSlice';
import { useAppDispatch } from '../app/hook';
import authservice from '../appwrite/auth';

function LogoutBtn() {
	const dispatch = useAppDispatch();
	const logoutHandler = () => {
		authservice.logout().then(() => dispatch(logout()));
	};

	return (
		<button
			className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
			onClick={logoutHandler}
		>
			Logout
		</button>
	);
}

export default LogoutBtn;
