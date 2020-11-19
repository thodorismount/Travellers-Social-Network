import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

import CreatePostDialog from '../components/CreatePostDialog';
import '../components/Navbar.css';
import $ from 'jquery';
import '../re.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, fetchMore } from '../actions/post';
import PostItem from '../components/posts/PostItem';
import Posts from '../components/posts/Posts';
import Spinner from '../components/Profile/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 6,
    paddingTop: '2rem',
    ["@media only screen and (max-width:550px)"]: { width: '100%' } 
  },
  paper: {
      backgroundColor: '#F0F2F5',
      height: '85vh',
      ["@media only screen and (min-width:550px)"]: { width: '80%', padding: '2rem'} ,
      ["@media only screen and (max-width:550px)"]: { width: '100%', padding: '0' } ,
      overflowY: 'scroll',
      scrollbarWidth: '0'
  }
}));

const Home = ({
  fetchMore,
  getPosts,
  postsLoading,
  authLoading,
  user,
  posts
}) => {
  const [skip, setSkip] = useState(5);

  const handleScroll = e => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop + 100 >= scrollHeight) {
      setSkip(skip + 5);
      fetchMore(skip);
    }
  };

  useEffect(() => {
    getPosts();
    var contents = $('#appbar')[0];
    contents.style.display = 'flex';
    var foot = $('#footer')[0];
    foot.style.display = 'none';
  }, [getPosts]);
  const classes = useStyles();

  return authLoading ? (
    <Spinner />
  ) : !(user && user.isRegistered) ? (
    <Redirect to={`/userProfile/${user && user._id}`} />
  ) : (
    <div className={classes.root}>
      <Grid justify={'center'} container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={12} md={10} justify={'center'} container>
          <Paper className={classes.paper}
            onScroll={handleScroll}
            justify='center'
          >
            {postsLoading ? (
              <Spinner />
            ) : (
              <div className='posts'>
                {posts &&
                  posts.length > 0 &&
                  posts.map(post => <PostItem key={post._id} post={post} />)}
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={1} md={1} lg={1} justify={'flex-end'} container>
          <CreatePostDialog />
        </Grid>
      </Grid>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  fetchMore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postsLoading: state.post.loading,
  posts: state.post.posts,
  user: state.auth.user,
  authLoading: state.auth.loading
});

export default connect(mapStateToProps, { getPosts, fetchMore })(Home);
