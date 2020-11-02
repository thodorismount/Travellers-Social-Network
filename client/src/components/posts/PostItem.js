import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addLike, removeLike} from '../../actions/post';


const PostItem = ({addLike, removeLike, auth, post: {_id, text, firstName, lastName, user, likes, comments, date, updatedAt}}) => {
   
    
    return (
    <div class='post-bg-white p1 my-1'>
        <div>
            <a href='profilehtml'>
                <h4>Test</h4>
            </a>
        </div>
        <div>
            <p class='my-1'>
                {text}
            </p>
            <p class='post-date'>Posted on 29/10/2020</p>
            <button onClick={e => addLike(_id)} type='button' class='btn btn-light'>
                <i class='fas fa-thumbs-up'/>
                <span>4</span>
            </button>
            <button onClick={e => removeLike(_id)} type='button' class='btn btn-light'>
                <i class='fas fa-thumbs-down'/>
            </button>
            <a href='post.html' class='btn btn-primary'>
                Discussion <span class='comment-count'>2</span>
            </a>
            <button type='button' class = 'btn btn-danger'>
                <i class='fas fa-times'></i>
            </button>
        </div>
    </div>
    )
}

  
   

   
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike}) (PostItem)
