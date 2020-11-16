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
    paddingTop: '10px'
  }
}));

const Home = props => {
  const [skip, setSkip] = useState(5);

  const handleScroll = e => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop + 100 >= scrollHeight) {
      setSkip(skip + 5);
      props.fetchMore(skip);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      props.getPosts();
    }, 50);
    var contents = $('#appbar')[0];
    contents.style.display = 'flex';
    var foot = $('#footer')[0];
    foot.style.display = 'none';
  }, []);
  const classes = useStyles();

  return props.loading ? (
    <Spinner />
  ) : !(props.user && props.user.isRegistered) ? (
    <Redirect to={`/userProfile/${props.user && props.user._id}`} />
  ) : (
    <div className={classes.root}>
      <Grid justify={'center'} container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} justify={'center'} container>
          <Paper
            onScroll={handleScroll}
            justify='center'
            style={{
              width: '80%',
              backgroundColor: '#F0F2F5',
              height: '85vh',
              padding: '2rem',
              overflowY: 'scroll',
              scrollbarWidth: '0'
            }}
          >
            {props.loading ? (
              <Spinner />
            ) : (
              <div className='posts'>
                {props.posts.length > 0 &&
                  props.posts.map(post => (
                    <PostItem key={post._id} post={post} />
                  ))}
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
  loading: state.post.loading,
  posts: state.post.posts,
  user: state.auth.user
});

export default connect(mapStateToProps, { getPosts, fetchMore })(Home);
