import { useEffect, useState } from 'react';
import { default as AppwriteService } from '../appwrite/config';
import { Container, PostCard } from '../components/index';

function AllPosts() {
	const [posts, setPosts] = useState<Array<string>>([]);
	useEffect(() => {
		AppwriteService.getPosts([]).then((post) => setPosts(post.documents));
	}, []);

	return (
		<div>
			<Container>
				<div className='flex flex-wrap'>
					{posts.map((post) => (
						<PostCard key={post.$id} post={post} />
					))}
				</div>
			</Container>
		</div>
	);
}

export default AllPosts;
