import {useEffect, useState} from 'react'

export default function Comment({content, name}) {

  return (
    <div className="comment-card">
      <div className="comment-body">
        {content}
      </div>
      <span>{name}</span>
    </div>
  )
}
