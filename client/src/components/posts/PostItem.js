import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import PostCard from '../PostCard';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CreatePostDialog from '../CreatePostDialog';
import '../Navbar.css';
import '../../re.css';
import Paper from '@material-ui/core/Paper';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    firstName,
    lastName,
    location,
    user,
    likes,
    comments,
    date,
    updatedAt
  }
}) => {
  return (
    <div>
      <Grid justify={'center'} container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={10}
          justify={'center'}
          container
          // className={'postContainer'}
        >
          <Paper
            justify='center'
            style={{
              width: '75%',
              backgroundColor: '#F0F2F5'
            }}
          >
            <PostCard
              caption={text}
              username={`${firstName}  ${lastName}`}
              location={`${location}`}
              date={`${
                moment(date).fromNow().includes('day') ||
                moment(date).fromNow().includes('month') ||
                moment(date).fromNow().includes('year')
                  ? moment(date).format('MMMM DD   YYYY')
                  : moment(date).fromNow()
              }`}
            />
          </Paper>
        </Grid>
        <Grid item xs={1} md={1} lg={1} justify={'flex-end'} container>
          <CreatePostDialog />
        </Grid>
        <Grid item xs={1} md={1} lg={1} justify={'flex-end'} container>
          <CreatePostDialog />
        </Grid>
      </Grid>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
