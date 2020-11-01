import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';
import CreatePostDialog from '../components/CreatePostDialog';
import PostCard from '../components/PostCard';
import '../components/Navbar.css';
import $ from 'jquery';
import '../re.css';

// var style = document.createElement('style');
// style.innerHTML = `
//   #target {
//     display: flex;
//   }
//   `;
// document.head.appendChild(style);

const Home = () => {
  useEffect(() => {
    var contents = $('#appbar')[0];
    contents.style.display = 'flex';
  }, []);

  return (
    <div>
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
          className={'postContainer'}
        >
          <PostCard />
          <PostCard />
          <PostCard />
        </Grid>
        <Grid item xs={1} md={1} lg={1} justify={'flex-end'} container>
          <CreatePostDialog />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
