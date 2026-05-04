import { useState } from 'react'
import { useLoaderData, useParams, useNavigate } from 'react-router'
import Comment from './Comment.jsx'

export default function Page(prop) {
  const API = import.meta.env.VITE_BASE_API_URL
  const navigate = useNavigate()
  const params = useParams()
  const { post, postComments } = useLoaderData()

  const [ title, setTitle] = useState()
  const [ body, setBody] = useState()


  function editForm() {
    const form = document.querySelector(".edit-form") 
    form.style.display = "flex";
    setTitle(post.title)
    setBody(post.content)
  }

  async function handleEdit(e) {
    const form = document.querySelector(".edit-form")
    e.preventDefault()
    const res = await fetch(API+`/posts/${params.postId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt-token")
      },
      body: JSON.stringify({title, body})
    })
    const data = await res.json()
    if (data.success) {
      form.style.display = "none";
      navigate(`/posts/${params.postId}`);      
    } else {
      throw new Error("Error whilst attempting to update post")
    }
  }

  return (
    <main className="post-page">
      <h2>{post.title}</h2> 
      <div className="post-body">{post.content}</div>
      <button className="edit-post" onClick={editForm}>Edit</button>
      <div className="post-comments">
        {postComments && postComments.map((comment) => {
          return (
            <Comment body={comment.content} name={comment.name} />
          )
        })}  
      </div>

      <form className="edit-form" style={{display: 'none'}}>
        <label htmlFor="title"></label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="content"></label>
        <textarea id="content" name="content" value={body} onChange={(e) => setBody(e.target.value)}/>

        <button onClick={handleEdit}>Edit Post</button>
      </form>
    </main>
  )
}
