import Comment from './Comment.jsx'
import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link, useLoaderData } from 'react-router'

export default function Post() {
  const API = import.meta.env.VITE_BASE_API_URL
  const { loggedIn } = useOutletContext()
  const [comment, setComment] = useState()
  const {postId} = useParams() 
  const { post, comments } = useLoaderData()

  async function postComment(e) {
    e.preventDefault()
    console.log(comment)
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
      comments.push([...comments, data.comment])
    } else {
      throw new Error("Databaase error", data.err)
    }
  }

  // TODO: Set a key for each card by redesigning the database models

  return (
    <main className="post-page">
      <h3>{post.title}</h3>
      <div className="post-body">
        {post.content}
      </div>
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
    </main>
  )
}
