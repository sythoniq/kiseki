import { Link } from 'react-router'
import { useState, useEffect } from 'react'

export default function Posts() {
  const API = import.meta.env.VITE_BASE_API_URL
  const [fetching, setFetching] = useState(true)
  const [posts, setPosts] = useState() 

  useEffect(() => {
    async function getPosts() {
      const result = await fetch(API+"/posts");
      const data = await result.json()
      if (data.success) { 
        setFetching(false)
        setPosts(data.posts)
      } else {
        setFetching(false) 
        console.error(err)
      }
    }
    return () => {
      getPosts()
    }
  }, [API, posts])

  console.log(fetching)

  if (fetching == true) {
    return (
      <p>Fetching posts...</p>
    )
  }
  
  return (
    <main className="posts-list">
      {posts && posts.map((post) => {
        return (
          <div className="post-card" key={post.id}>
            <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
            <span>{new Date(post.uploadedAt).toDateString()}</span>
          </div>
        )
      })}
    </main>
  )
}
