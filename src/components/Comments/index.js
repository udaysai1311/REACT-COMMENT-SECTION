import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
    isLiked: false,
    userNameColor: initialContainerBackgroundClassNames,
  }

  likedComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredList})
  }

  addNewComment = event => {
    event.preventDefault()
    const randomColor =
      initialContainerBackgroundClassNames[Math.ceil(Math.random() * 7 - 1)]
    const {name, comment} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      userNameColor: randomColor,
      date: new Date(),
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  nameInput = event => {
    this.setState({name: event.target.value})
  }

  commentInput = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentsList} = this.state
    const totalCommentNumber = commentsList.length
    return (
      <div className="bg-container">
        <h1 className="head">Comments</h1>
        <div className="comment-textInput-container">
          <form className="comment-input-area" onSubmit={this.addNewComment}>
            <p className="para">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="yourName-input"
              onChange={this.nameInput}
              value={name}
            />
            <textarea
              rows="8"
              cols="40"
              placeholder="Your Comment"
              value={comment}
              onChange={this.commentInput}
            />
            <button type="submit" className="add-comment-button">
              Add Comment
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
        </div>
        <p className="line">
          <span className="number">{totalCommentNumber} </span>Comments
        </p>
        <ul>
          {commentsList.map(eachComment => (
            <CommentItem
              commentOf={eachComment}
              key={eachComment.id}
              deleteComment={this.deleteComment}
              likedComment={this.likedComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
