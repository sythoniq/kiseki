import { useLoaderData } from 'react-router'

import Post from './Post.jsx'

export default function Home() {
  const posts = useLoaderData() 
  console.log(posts);

  return (
    <main className="posts-list">
      {posts && posts.map((post) => {
        return (
          <Post key={post.id} postId={post.id} postTitle={post.title} date={post.uploadedAt} published={post.published} /> 
        )
      })} 
    </main>
  )
}
