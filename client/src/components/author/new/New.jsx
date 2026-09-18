import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router'
import { Editor } from '@tinymce/tinymce-react'
import toast from 'react-hot-toast'
import styles from './new.module.css'

export default function New() {
	const API=import.meta.env.VITE_BASE_API
	const TINY_API=import.meta.env.VITE_TINY_API
	const TOKEN = localStorage.getItem('jwt-token')
	const navigate = useNavigate()

	const [ title, setTitle ] = useState('')
	const [ body, setBody ] = useState('')
	const [ category, setCategory ] = useState('')

	const editorRef = useRef(null)

	async function handlePostSave(e) {
		e.preventDefault()
		
		if (title.length <= 0) {
			return toast.error("Title cannot be empty.")
		}	else if (body.length <= 0) {
			return toast.error("Post body cannot be empty.")
		}	else if (category.length <= 0) {
			return toast.error("Category cannot be empty.")
		}

		try {
			const res = await fetch(`${API}/posts/upload`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": TOKEN,
				},
				body: JSON.stringify({title, content: body, category})
			})
			const data = await res.json()

			if (res.status == 401) {
				toast.error("Unauthorized! How'd you even get here?!")
				return navigate('/login')
			}
			if (!data.success) {
				return toast.error(data.messaage)
			}

			toast.success(data.message)
			return navigate("/author")
		} catch(e) {
			return toast.error("Something went wrong!")
		}	
	}

	return (
		<main className={styles.newPost}>
			<div className={styles.pageTop}>
				<Link to="/author"><button>Back</button></Link>
				<h2>New Post</h2>
			</div>
			<form className={styles.postForm} onSubmit={handlePostSave}>
				<section className={styles.postTop}>
					<div>
						<label htmlFor="title">Title</label>
						<input name="title" id="title" placeholder="Post title" onChange={(e) => setTitle(e.target.value)} />
					</div>
					<div>
						<label htmlFor="category">Category</label>
						<input name="category" id="category" placeholder="Post category" onChange={(e) => setCategory(e.target.value)}/>
					</div>
				</section>
				<Editor
            onEditorChange={(postBody) => {
              setBody(postBody);
            }}
            apiKey={TINY_API}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Scribble blog body here...</p>"
            init={{
              height: 500,
              width: "99%",
              menubar: false,
              skin: "oxide-dark",

              content_css: "dark",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:1rem; background-color:#2a323c;color:white;  }",
            }}
          />
				<button>Save</button>
			</form>
		</main>
	)
}
