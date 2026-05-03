export default function Comment(prop) {
  return (
    <div className="comment-card">
      <p>{prop.body}</p>
      <div className="comment-details">
        <span>{prop.name}</span>
      </div>
      <div className="delete-comment">
        <button>Delete</button>
      </div>
    </div>
  )
}
