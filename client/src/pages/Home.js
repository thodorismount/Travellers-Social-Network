import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';
import CreatePostDialog from '../components/CreatePostDialog';
import PostCard from '../components/PostCard';
import $ from 'jquery';
var style = document.createElement('style');
style.innerHTML = `
  #target {
    display: flex;
    justify-content:flex-end;
  }
  `;
document.head.appendChild(style);

const Home = () => {
  useEffect(() => {
    var contents = $('#appbar')[0];
    contents.style.display = 'flex';
  }, []);

  return (
    <div>
      <Grid id='target' container spacing={3}>
        <Grid item xs={4}>
          <CreatePostDialog />
        </Grid>
      </Grid>
      <Grid justify={'center'} container spacing={3}>
        <Grid item xs={4}>
          <PostCard />
          <PostCard />
          <PostCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
