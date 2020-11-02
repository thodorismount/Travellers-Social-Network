import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';
import CreatePostDialog from '../components/CreatePostDialog';
import PostCard from '../components/PostCard';
import '../components/Navbar.css';
import $ from 'jquery';
import '../re.css';
import Paper from '@material-ui/core/Paper';

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
              caption='Throwback to my trip in Morocco'
              username='Maria Iwannou'
              image='static/images/morocco.jpg'
              location='Morocco'
              date='October 14, 2020'
            />
            <PostCard
              caption='Looking forward for my next flight to Paris'
              username='Giwrgos Petrou'
              image='static/images/paris.jpg'
              location='Paris'
              date='September 9, 2020'
            />
            <PostCard
              caption='Any good restaurants in NY?'
              username='Bill Kotas'
              image='static/images/newYork.jpg'
              location='New York'
              date='May 19, 2020'
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

export default Home;
