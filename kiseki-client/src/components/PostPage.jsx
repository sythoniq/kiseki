import Comment from './Comment.jsx'
import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link, useLoaderData } from 'react-router'

export default function Post() {
  const API = import.meta.env.VITE_BASE_API_URL
  const { loggedIn, user } = useOutletContext()
  const [comment, setComment] = useState()
  const {postId} = useParams() 
  const { post, comments } = useLoaderData()

  async function postComment() {
    const token = localStorage.getItem('jwt-token')
    const result = await fetch(API+`/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: {
        content: comment,
        authorid: user.id
      }
    });
    const data = await result.json()
    if (data.success) {
      comments.append([...comments, data.comment])
    } else {
      throw new Error("Databaase error", data.err)
    }
  }

  return (
    <main className="post-page">
      <h3>{post.title}</h3>
      <div className="post-body">
        {post.content}
      </div>
      {loggedIn ? (
        <div className="uplaod-comment">
          <form>
            <input type="text" name="comment" placeholder="Write a comment" />
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
