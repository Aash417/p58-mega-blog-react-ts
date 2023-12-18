type Props = {
	children: string | JSX.Element | JSX.Element[];
	// type: string;
	bgColor: string;
	textColor: string;
	className: string;
};

function Button({
	children,
	// type = 'button',
	bgColor = 'bg-blue-500',
	textColor = 'text-white',
	className = '',
	...props
}: Props) {
	return (
		<button
			className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
