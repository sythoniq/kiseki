import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import styles from './new.module.css'

export default function New() {
	const TINY_API=import.meta.env.VITE_TINY_API
	const editorRef = useRef(null);
	const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
	return (
		<main className={styles.newPost}>

			<Editor apiKey={TINY_API} onInit={ (_evt, editor) => editorRef.current = editor }	init={ 
				{
					height: 800,
					menubar: false,
					content_style: 'body { font-family:monospace; font-size:1em}',
					plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
					toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat', 
				} 
			}
			/>
			<button onClick={log}>Log</button>
		</main>
	)
}
