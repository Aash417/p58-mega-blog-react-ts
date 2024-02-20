import { useEffect, useId, useState } from 'react';
import { default as AppwriteService } from '../appwrite/config';
import { Container, PostCard } from '../components/index';

function AllPosts() {
	const [posts, setPosts] = useState<Array<Document>>([]);
	const id = useId();

	useEffect(() => {
		AppwriteService.getPosts([]).then((post) => setPosts(post.documents));
	}, []);

	return (
		<div>
			<Container>
				<div className='flex flex-wrap'>
					{posts.map((post) => (
						<PostCard
							$id={post.userId}
							featuredImage={post.featuredImage}
							key={id}
							title={post.title}
						/>
					))}
				</div>
			</Container>
		</div>
	);
}

export default AllPosts;
