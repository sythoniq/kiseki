import { useState } from 'react'
import { useLoaderData, Link } from 'react-router'

import Post from './Post.jsx'

export default function Home() {
  const loadedPosts = useLoaderData()
  const [posts, setPosts] = useState()
  
  if (loadedPosts !== null || loadedPost !== undefined) {
    console.log("passed")
    setPosts(loadedPosts) 
  }
  
  if (!posts) {
    return (
      <main className="posts-page">
        <p>No posts currently..</p>
      </main>
    )
  } 

  const publishedPosts = posts.filter((post) => post.published === true)
  const unpublishedPosts = posts.filter((post) => post.published === false)

  return (
    <main className="posts-page">
      <div className="create-post">
      </div>
      <div className="published-posts">
        <h4>Published Posts</h4>
        {publishedPosts && publishedPosts.map((post) => {
          <Post title={post.title} uploadedAt={post.uploadedAt} published={post.published} />
        })}
      </div>
      <div className="unpublished-posts">
        <h4>Unpublished Posts</h4>
        {unpublishedPosts && unpublishedPosts.map((post) => {
          <Post title={post.title} uploadedAt={post.uploadedAt} published={post.published} />
        })}
      </div>
    </main>
  )
}
