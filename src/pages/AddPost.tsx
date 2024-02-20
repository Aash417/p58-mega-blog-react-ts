import { useState } from 'react';
import { Container, PostForm } from '../components/index';

function AddPost() {
	const [posts, setPosts] = useState<Array<Document>>([]);


	return (
		<div className='py-8'>
			<Container>
				<PostForm post={posts} />
			</Container>
		</div>
	);
}

export default AddPost;
