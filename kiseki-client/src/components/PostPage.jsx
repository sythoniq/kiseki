import Comment from './Comment.jsx'
import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link } from 'react-router'

export default function Post() {
  const API = import.meta.env.VITE_BASE_API_URL
  const [fetchingComments, setFetchingComments] = useState(true)
  const { loggedIn, user } = useOutletContext()
  const [comments, setComments] = useState()
  const [comment, setComment] = useState()
  const {postId} = useParams() 


  useEffect(() => {
    async function getPostComments() {
      const result = await fetch(API+`/posts/${postId}/comments`)
      const data = await result.json()
      if (data.success) {
        setComments(data.comments)
        setFetchingComments(false)
      } else {
        setFetchingComments(false)
        console.error(data.err)
      }
    }

    return () => {
      getPost()
      getPostComments()
    }
  }, [API])

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
      setComments([...comments, data.comment])
    } else {
      return;
    }
  }

  if (fetchingPost) {
    return (
      <p>Loading post...</p>
    )
  }
  
  if (fetchingComments) {
    return (
      <p>Loading comments...</p>
    )
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
            <Comment content={comment.content} id={comment.id} key={comment.id} name={user.name} />
          )
        })} 
      </div>
    </main>
  )
}
