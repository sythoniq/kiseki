import Comment from './Comment.jsx'
import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link, useLoaderData } from 'react-router'

export default function Post() {
  const API = import.meta.env.VITE_BASE_API_URL
  const { loggedIn } = useOutletContext()
  const [comment, setComment] = useState()
  const [comments, setComments] = useState(null)
  const {postId} = useParams() 
  const { post, postComments } = useLoaderData()
  
  useEffect(() => {
    return () => {
      setComments(postComments);
    }
  }, [postComments])

  async function postComment(e) {
    e.preventDefault()
    const token = localStorage.getItem('jwt-token')
    const result = await fetch(API+`/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        content: comment
      })
    });
    const data = await result.json()
    if (data.success) {
      setComments([...comments, data.comment])
      console.log(comments, data.comment)
    } else {
      throw new Error("Databaase error", data.err)
    }
  }

  if (!comments) {
    return <div>Loading...</div>
  }

  // TODO: Set a key for each card by redesigning the database models

  return (
    <main className="post-page">
      <h3>{post.title}</h3>
      <div className="post-body">
        {post.content}
      </div>
      <div className="comments-section">
      <h4>{comments.length} Comments</h4>
      {loggedIn ? (
        <div className="uplaod-comment">
          <form>
            <input type="text" name="comment" placeholder="Write a comment"
        onChange={(e) => setComment(e.target.value)}/>
            <button onClick={postComment}>Comment</button>
          </form>
        </div>
      ) : (
        <span><Link to="/login"><button>Login</button></Link> to post comments...</span>
      )}
      <div className="post-comments">
        {comments && comments.map((comment) => {
          return (
            <Comment content={comment.content} name={comment.name} />
          )
        })} 
      </div>
      </div>
    </main>
  )
}
