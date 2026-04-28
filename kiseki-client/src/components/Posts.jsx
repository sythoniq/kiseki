import { Link, useLoaderData } from 'react-router'
import { useState, useEffect } from 'react'

export default function Posts() {
  const API = import.meta.env.VITE_BASE_API_URL
  const posts = useLoaderData()

  return (
    <main className="posts-list">
      <h4>Recent Posts</h4>
      {posts && posts.map((post) => {
        return (
            <div className="post-card" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
                <div className="post-extra">
                  <span>{new Date(post.uploadedAt).toLocaleDateString(undefined,
                    {month: "long", day: "numeric"})}</span>
                </div>
              </Link>
            </div>
        )
      })}
    </main>
  )
}
