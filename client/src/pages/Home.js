import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';
import CreatePostDialog from '../components/CreatePostDialog';
import $ from 'jquery';

const Home = () => {
  useEffect(() => {
    var contents = $('#navigationbar')[0];
    contents.style.display = 'flex';
  }, []);

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        <p>Posts...</p>
      </Grid>
      <Grid item sm={4} xs={12}>
        <CreatePostDialog />
      </Grid>
    </Grid>
  );
};

export default Home;
