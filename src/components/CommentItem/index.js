import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentOf, deleteComment, likedComment} = props
  const {id, name, comment, isLiked, date, userNameColor} = commentOf

  const likeToggleImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)
  const likeClassName = isLiked ? 'liked' : 'like'
  const onDelete = () => {
    deleteComment(id)
  }

  const likeClicked = () => {
    likedComment(id)
  }

  return (
    <li>
      <div className="commenter-name-container">
        <p className={`nameLogo ${userNameColor}`}>{name[0].toUpperCase()}</p>
        <p>{name}</p>
        <p className="time">{postedTime} ago</p>
      </div>
      <p className="comment-style">{comment}</p>
      <div className="like-delete-container">
        <div className="like-container">
          <button type="button" className="button" id="delete">
            <img
              src={likeToggleImg}
              alt={likeClassName}
              className="like-image"
              onClick={likeClicked}
            />
          </button>
          <p className={likeClassName}>Like</p>
        </div>
        <button
          type="button"
          className="button"
          data-testid="delete"
          onClick={onDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
