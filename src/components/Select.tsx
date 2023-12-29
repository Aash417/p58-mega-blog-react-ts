import { ForwardedRef, forwardRef, useId } from 'react';

type Props = {
	label?: string;
	className?: string;
	options: Array<string>;
};

const Select = forwardRef(function (
	{ options, label = '', className = '', ...props }: Props,
	ref: ForwardedRef<HTMLSelectElement>
) {
	const id = useId();

	return (
		<div className='w-full'>
			{label && (
				<label htmlFor={id}>
					<select {...props} id={id} ref={ref} className={className}>
						{options?.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</label>
			)}
		</div>
	);
});

export default Select;
