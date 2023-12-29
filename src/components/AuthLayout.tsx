import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hook';
import { useNavigate } from 'react-router-dom';

type Props = {
	children: string | JSX.Element | JSX.Element[];
	authentication: boolean;
};

export function Protected({ children, authentication = true }: Props) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const authStatus = useAppSelector((state) => state.auth.status);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate('/login');
		} else if (!authentication && authStatus !== authentication) {
			navigate('/');
		}

		setIsLoading(false);
	}, [authStatus, navigate, authentication]);

	return isLoading ? <h1>Loading...</h1> : <>{children}</>;
}
