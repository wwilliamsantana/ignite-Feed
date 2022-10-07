import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import styles from "./Post.module.css"



export function Post({author, content, publishedAt}){

  const [comments, setComments] = useState([
    "Post muito bacana, hein?!"
  ])
  const [newCommentText, setNewCommentText] = useState("")

  const publishedDateFormat = format(publishedAt, "dd 'de' MMM 'ás' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(){
    event.preventDefault()

    setComments([...comments, newCommentText ])
    setNewCommentText("")
  }

  function handleNewCommentChange(){
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete){
    const commentsWithoutDeleteOne = comments.filter(comment => comment !== commentToDelete)

    setComments(commentsWithoutDeleteOne)
  }

  return (
    <article className={styles.post}>

      <header>
        <div className={styles.author}>

          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>

        </div>

        <time
          title= {publishedDateFormat} 
          dateTime={publishedAt.toLocaleString()}
        > 
        {publishedDateRelativeToNow}
        </time>
      </header>


      <div className={styles.content}>
       
       {
        content.map(item => {
          if(item.type === "paragraph"){
            return <p key={item.content} >{item.content}</p>
          }else if(item.type === "link"){
            return <p key={item.content}><a href="#">{item.content}</a></p>
          }
        })
       }

      </div>
      
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>

      </form>

      <div className={styles.commentList}>
          {
            comments.map(item => <Comment key={item} content={item} onDeleteComment={deleteComment}/>)
          }

      </div>


    </article>
  )
}