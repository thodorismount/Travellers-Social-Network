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
import ScrollTop from '../components/ScrollTop';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 6,
    fontFamily: 'Bahnschrift Condensed',
    paddingTop: '2rem',
    ['@media only screen and (max-width:550px)']: { width: '100%' }
  },
  paper: {
    backgroundColor: '#F0F2F5',
    height: '85vh',
    fontFamily: 'Bahnschrift Condensed',
    ['@media only screen and (min-width:550px)']: {
      width: '80%',
      padding: '2rem'
    },
    ['@media only screen and (max-width:550px)']: {
      width: '100%',
      padding: '0'
    },
    overflowY: 'scroll',
    scrollbarWidth: '0'
  },
  backtotop: {
    ['@media only screen and (min-width:550px)']: {
      position: 'fixed',
      bottom: '3rem',
      right: '15%'
    },
    ['@media only screen and (max-width:550px)']: {
      position: 'fixed',
      bottom: '7rem',
      right: '2.5rem'
    }
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
  const [skip, setSkip] = useState(2);
  const [fetch, setFetch] = useState(true);

  const handleScroll = e => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight && fetch) {
      setFetch(false);
      setSkip(skip + 2);
      fetchMore(skip);
      setInterval(() => {
        setFetch(true);
      }, 1000);
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
          <Paper
            className={classes.paper}
            onScroll={handleScroll}
            justify='center'
            id='postsPaper'
          >
            {postsLoading ? (
              <div className='posts'>
                <Spinner />
              </div>
            ) : (
              <div className='posts'>
                <div id='back-to-top-anchor'></div>
                {posts &&
                  posts.length > 0 &&
                  posts.map(post => <PostItem key={post._id} post={post} />)}
              </div>
            )}
            <ScrollTop>
              <Fab
                className={classes.backtotop}
                color='primary'
                size='small'
                aria-label='scroll back to top'
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </Paper>
        </Grid>
        <Grid item md={1} justify={'flex-end'} container></Grid>
      </Grid>
      <CreatePostDialog />
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
