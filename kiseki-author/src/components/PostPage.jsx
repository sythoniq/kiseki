import { useLoaderData } from 'react-router'
import Comment from './Comment.jsx'

export default function Page(prop) {
  const { post, postComments } = useLoaderData()

  return (
    <main className="post-page">
      <h2>{post.title}</h2> 
      <div className="post-body">{post.content}</div>
      <div className="post-comments">
        {postComments && postComments.map((comment) => {
          return (
            <Comment body={comment.content} name={comment.name} />
          )
        })}  
      </div>
    </main>
  )
}
