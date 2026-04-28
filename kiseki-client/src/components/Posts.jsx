import { Link, useLoaderData } from 'react-router'
import { useState, useEffect } from 'react'

export default function Posts() {
  const API = import.meta.env.VITE_BASE_API_URL
  const posts = useLoaderData()

  return (
    <main className="posts-list">
      {posts && posts.map((post) => {
        return (
          <div className="post-card" key={post.id}>
            <div className="post-header"><Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link></div>
            <div className="post-extra">
              <span>{new Date(post.uploadedAt).toLocaleDateString(undefined,
                {month: "long", day: "numeric"})}</span>
            </div>
          </div>
        )
      })}
    </main>
  )
}
