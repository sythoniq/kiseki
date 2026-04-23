import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link } from 'react-router'

export default function Post() {
  console.log(useOutletContext())
  const API = import.meta.env.VITE_BASE_API_URL
  const [fetching, setFetching] = useState(true)
  const [post, setPost] = useState()
  const [comments, setComments] = useState()
  const [error, setError] = useState()
  const [comment, setComment] = useState()
  const {postId} = useParams() 

  useEffect(() => {
    async function getPost() {
      const result = await fetch(API+`/posts/${postId}`);
      const data = await result.json()
      if (data.success) {
        setFetching(false)
        setPost(data.post)
      } else {
        setFetching(false)
        setError(data.err)
      }
    }

    async function getPostComments() {
      const result = await fetch(API+`/posts/${postId}/comments`)
      const data = await result.json()
      if (data.success) {
        setFetching(false)
        setComments(data.comments)
      } else {
        setFetching(false)
        setError(data.err)
      }
    }

    return () => {
      getPost()
      getPostComments()
    }
  }, [API, post, comments])

  async function postComment() {
    const token = localStorage.getItem('jwt-token')
    const result = await fetch(API+`/posts/${postid}/comment`, {
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

  if (fetching) {
    return (
      <p>Loading post...</p>
    )
  }

  if (error) {
    return (
      <p>Error fetching post...</p>
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
          <Comment content={comment.content} id={comment.id} key={comment.id} commenterId={comment.authorId}/>
        })} 
      </div>
    </main>
  )
}
