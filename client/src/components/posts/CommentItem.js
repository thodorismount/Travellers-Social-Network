import React from 'react';
import Divider from '@material-ui/core/Divider';
import { removeComment } from '../../actions/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const CommentItem = ({
  postId,
  comment: { _id, user, text, name, date },
  auth,
  removeComment
}) => {
  return (
    <div>
      <div style={{ margin: '0.9rem' }}>
        {/* <h4 style={{ lineHeight: '0.9rem' }}>{name}</h4>
        <p>{text}</p>
        {user === (auth.user && auth.user._id) && ( */}
        {/* // <IconButton onClick={e => removeComment(postId, _id)}> */}
        {/* //   <DeleteForeverOutlinedIcon fontSize='medium' color='secondary' /> */}
        {/* // </IconButton> */}
        <ListItem>
          <ListItemText primary={name} secondary={text} />
          {user === (auth.user && auth.user._id) && (
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={e => removeComment(postId, _id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
