import React from 'react';
import {removeComment} from '../../actions/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const CommentItem = ({ postId, comment: {_id, user, text, name, date }, auth, removeComment }) => {
  return (
    <div
      style={{
        marginBottom: '0.5rem',
        border: '1px solid blue',
        borderRadius: '10px'
      }}
    >
      <div style={{ margin: '0.2rem' }}>
        <h4 style={{ lineHeight: '0.2rem' }}>{name}</h4>
        <p>{text}</p>
        {user === (auth.user && auth.user._id)  && (
        <button onClick={ e =>  removeComment(  postId, _id) } type="button" className="btn btn-danger">
          
        </button>
      )}
      </div>
      
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment:PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {removeComment}) (CommentItem);
