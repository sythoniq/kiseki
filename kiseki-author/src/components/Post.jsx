export default function Post(props) {
  return (
    <div className="post-card">
      <header className="post-header">
        <h2>{props.title}</h2>
      </header>
      <div className="post-details">
        <span>{new Date(props.uploadedAt).toLocaleDateString(undefined, {month: "long", day: "numeric"})}</span>
        {props.published ? (
          <span>Published</span>
        ) : (
          <span>Not Published</span>
        )}
      </div>
    </div>
  )
}
