import { useEffect, useId, useState } from 'react';
import { default as AppwriteService, createPostType } from '../appwrite/config';
import { Container, PostCard } from '../components/index';

function Home() {
	const [posts, setPosts] = useState<Array<Document>>([]);
	const id = useId();

	useEffect(() => {
		AppwriteService.getPosts().then((post) => setPosts(post.documents));
	}, [setPosts]);

	if (posts && posts.length === 0)
		return (
			<div className='w-full py-8 mt-4 text-center'>
				<Container>
					<div className='flex flex-wrap'>
						<div className='p-2 w-full'>
							<h1 className='text-2xl font-bold hover:text-gray-500'>
								Login to read posts
							</h1>
						</div>
					</div>
				</Container>
			</div>
		);

	return (
		<div className='w-full py-8'>
			<Container>
				<div className='flex flex-wrap'>
					{posts &&
						posts.map((post) => (
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

export default Home;
