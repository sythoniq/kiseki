import { Link, useNavigate } from 'react-router'

function getPostId(target) {
  return target.closest(".post-card").getAttribute("id")
}

export default function Post(prop) {
  const API = import.meta.env.VITE_BASE_API_URL
  const navigate = useNavigate()
  const token = localStorage.getItem("jwt-token")

  async function unpublishPost(e) {
    const postId = getPostId(e.target)
    const res = await fetch(API+`/posts/${postId}/unpublish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()
    if (data.success) {
      navigate("/")      
    } else {
      throw new Error("Hmm unexpected error occurred...")
    }
  }
  
  async function publishPost(e) {
    const postId = getPostId(e.target)
    const res = await fetch(API+`/posts/${postId}/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()
    if (data.success) {
      navigate("/")
    } else {
      throw new Error("Hmm unexpected error occurred...")
    }
  }
  
  async function deletePost(e) {
    const postId = getPostId(e.target) 
    const res = await fetch(API+`/posts/${postId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()
    if (data.success) {
      navigate("/")
    } else {
      throw new Error("Unexpected error occurred...");
    }
  }
  
  return (
    <div className="post-card" id={prop.postId}>
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
