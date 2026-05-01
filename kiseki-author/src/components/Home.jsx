import { useState } from 'react'
import { useLoaderData, Link } from 'react-router'

import Post from './Post.jsx'

export default function Home() {
  const loadedPosts = useLoaderData()
  console.log(loadedPosts);

  const publishedPosts = loadedPosts.filter((post) => post.published === true)
  const unpublishedPosts = loadedPosts.filter((post) => post.published === false)

  return (
    <main className="posts-page">
      <div className="published-posts">
        {publishedPosts && publishedPosts.map((post) => {
          <Post title={post.title} uploadedAt={post.uploadedAt} published={post.published} />
        })}
      </div>
      <div className="unpublished-posts">
        {unpublishedPosts && unpublishedPosts.map((post) => {
          <Post title={post.title} uploadedAt={post.uploadedAt} published={post.published} />
        })}
      </div>
    </main>
  )
}
