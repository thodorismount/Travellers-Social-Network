import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import CreatePostDialog from '../components/CreatePostDialog';
import '../components/Navbar.css';
import $ from 'jquery';
import '../re.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/post';
import PostItem from '../components/posts/PostItem';
import Posts from '../components/posts/Posts';
import Spinner from '../components/Profile/Spinner';

// var style = document.createElement('style');
// style.innerHTML = `
//   #target {
//     display: flex;
//   }
//   `;
// document.head.appendChild(style);

const useStyles = makeStyles(theme => ({
  root: {
    //margin of whole feed view from navbar
    flexGrow: 6,
    paddingTop: '10px'
  }
}));

const Home = props => {
  useEffect(() => {
    var contents = $('#appbar')[0];
    contents.style.display = 'flex';
    props.getPosts();
  }, [getPosts]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Grid id='target' container spacing={3}>
        <Grid item xs={1}>
          
        </Grid>
      </Grid> */}

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
            {props.loading ? (
              <Spinner />
            ) : (
              <div className='posts'>
                {props.posts &&
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
        <Grid item xs={1} md={1} lg={1} justify={'flex-end'} container>
          <CreatePostDialog />
        </Grid>
      </Grid>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: state.post.loading,
  posts: state.post.posts
});

export default connect(mapStateToProps, { getPosts })(Home);
