import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ postId,addComment }) => {

    const [text,setText] = useState('');

    const onChange = (ele) =>{
        setText(ele.target.value);
    }

    const onSubmit = (ele) =>{
        ele.preventDefault();
        addComment(postId,{text});
        setText('')
    }

    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
            value = {text}
            onChange = {e => onChange(e)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
    addComment : PropTypes.func.isRequired
}

export default connect(null,{ addComment })(CommentForm);
