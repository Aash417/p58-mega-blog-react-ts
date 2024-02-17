import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { default as AppwriteService } from '../appwrite/config';
import { Container, PostForm } from '../components/index';

function EditPost() {
	const [posts, setPosts] = useState();
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			AppwriteService.getPost(slug).then((post) => {
				if (post) setPosts(post);
			});
		} else {
			navigate('/');
		}
	}, [slug, navigate]);

	return (
		<div className='py-8'>
			<Container>
				<PostForm post={posts} />
			</Container>
		</div>
	);
}

export default EditPost;
