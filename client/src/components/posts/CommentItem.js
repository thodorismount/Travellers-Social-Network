import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { removeComment } from '../../actions/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import moment from 'moment';

const CommentItem = ({
  postId,
  comment: { _id, user, text, name, date },
  auth,
  removeComment
}) => {
  const [disabled, setDisabled] = useState(false);
  const handleClick = e => {
    setDisabled(true);
    setInterval(() => {
      setDisabled(false);
    }, 3000);
    removeComment(postId, _id);
  };
  return (
    <div>
      <div style={{ margin: '0.9rem' }}>
        <ListItem>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  variant='h6'
                  color='textPrimary'
                  component={'span'}
                  style={{ fontFamily: 'Bahnschrift Condensed' }}
                >
                  <Link
                    href={`/userProfile/${user && user}`}
                    color='textPrimary'
                  >
                    {name}
                  </Link>
                </Typography>
                <Typography
                  variant='subtitle1'
                  display='inline'
                  color='textSecondary'
                  style={{
                    marginLeft: '0.5rem',
                    fontFamily: 'Bahnschrift Condensed'
                  }}
                >
                  {moment(date).fromNow().includes('day') ||
                  moment(date).fromNow().includes('month') ||
                  moment(date).fromNow().includes('year')
                    ? moment(date).format('DD MMMM YYYY')
                    : moment(date).fromNow()}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  variant='subtitle1'
                  color='textPrimary'
                  component={'span'}
                  style={{ fontFamily: 'Bahnschrift Condensed' }}
                >
                  {text}
                </Typography>
              </React.Fragment>
            }
          />
          {user === (auth.user && auth.user._id) && (
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                disabled={disabled ? disabled : false}
                aria-label='delete'
                onClick={handleClick}
              >
                <DeleteForeverOutlinedIcon style={{ color: '#EE0101' }} />
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
