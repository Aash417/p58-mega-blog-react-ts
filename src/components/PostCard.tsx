import { Link } from 'react-router-dom';
import { default as AppwriteService } from '../appwrite/config';

type Props = {
	$id: string;
	title: string;
	featuredImage: string;
};
function PostCard({ $id, title, featuredImage }: Props) {
	return (
		<Link to={`/post/${$id}`}>
			<div className='w-full bg-gray-100 rounded-xl p-4'>
				<div className='w-full justify-center mb-4'>
					<img
						src={
							AppwriteService.getFilePreview(
								featuredImage
							) as unknown as string
						}
						alt={title}
						className='rounded-xl'
					/>
				</div>
				<h2 className='text-xl font-bold'>{title}</h2>
			</div>
		</Link>
	);
}

export default PostCard;
