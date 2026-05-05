import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Create() {
  const API = import.meta.env.VITE_BASE_API_URL;
  const navigate = useNavigate()

  const [postTitle, setPostTitle] = useState()
  const [postBody, setPostBody] = useState()

  async function handlePostUpload(e) {
    e.preventDefault() 
    
    const res = await fetch(API+'/posts/upload', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt-token")
      },
      body: JSON.stringify({title: postTitle, content: postBody})
    })
    const data = await res.json()
    if (data.success) {
      navigate("/"); 
    } else {
      throw new Error("Failed to upload new post")
    }
  }

  return (
    <main className="create-form">
      <h2>Create New Post</h2>
      <form>
        <label htmlFor="postTitle"></label>
        <input type="text" name="postTitle" id="postTitle" placeholder="Post Title" onChange={(e) => setPostTitle(e.target.value)}/>
        <label htmlFor="postBody"></label>
        <textarea rows="15" id="postBody" name="postBody" placeholder="Post Body" onChange={(e) => setPostBody(e.target.value)} />
        
        <button onClick={handlePostUpload}>Upload</button>
      </form>
    </main> 
  )
}
