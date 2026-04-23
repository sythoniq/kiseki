import {useEffect, useState} from 'react'

export default function Comment({content, id, commenterId}) {
  const API = import.meta.env.VITE_BASE_API_URL
  const [commenter, setCommenter] = useState()
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    async function getCommenter() {
      const result = await fetch(API+`/posts/commenter/${commenterId}`)
      const data = await result.json()
      if (data.success) {
        setCommenter(data.commenter)
        setFetching(false)
      }
    }
    return () => {
      getCommenter()
    }
  })
  
  if (fetching) {
    return (
      <span>Loading comments...</span>
    )
  }

  return (
    <div className="comment-card">
      <div className="comment-body">
        {content}
      </div>
      <span>{commenter.name}</span>
    </div>
  )
}
