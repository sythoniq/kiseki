import { Link, useParams } from 'react-router'

export default function Post(prop) {
  const API = import.meta.env.VITE_BASE_API_URL
  const params = useParams()

  async function unpublishPost() {
    const res = await fetch(API+`/posts/${params.postid}`)
  }
  
  async function publishPost() {

  }
  
  async function deletePost() {
    
  }
  
  return (
    <div className="post-card">
      <Link to={`/posts/${prop.postId}`}>
        <h2>{prop.postTitle}</h2>
      </Link>
      <div className="post-details">
        <span>{new Date(prop.date).toLocaleDateString(undefined, {month: "long", day: "numeric"})}</span>
        {prop.published ? (
          <button className="unpublish-btn" onClick={unpublishPost}>Unpublish</button>
        ) : (
          <button className="publish-btn" onClick={publishPost}>Publish</button>
        )}
        <button className="delete-post" onClick={deletePost}>Delete</button>
      </div>
    </div>
  )
}
