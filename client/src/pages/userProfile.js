import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RoomIcon from '@material-ui/icons/Room';
import CakeIcon from '@material-ui/icons/Cake';
import Button from '@material-ui/core/Button';
import EditProfileModal from '../components/createProfile'
import PostCard from '../components/PostCard';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 6,

  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    // justifyContent: 'center',
    height: "auto",
  },
  card:{
    textAlign: 'center',
    justifyContent: 'center',
    height: "auto",
  }
}));

const useStylesImg = makeStyles({
    
    image:{
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto',
        borderRadius: '50%',
      }
})

export default function UserProfile() {
  const classes = useStyles();
  const classesImg = useStylesImg();

  return (
    <div className={classes.root}>
      <Grid justify={'center'}  container spacing={3}>
        <Grid item xs={4}>
                <Card className={classes.card} width="auto">
                  <CardContent>    
                    <img className={classesImg.image} src="static/images/obama.png" />
                    <Typography variant="h4" gutterBottom>
                        Barack Obama
                    </Typography>
                    <EditProfileModal/>
                  </CardContent>
                </Card>
        </Grid>
    </Grid>
    <Grid container spacing={3} >
        <Grid item xs={4} sm={4} >
            <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                    <RoomIcon/> Washington, USA
                    <br/> 
                    <CakeIcon/> 04/06/1961
                    <br/> 
                    travel experience
                    <br/> 
                    places visited
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={8} sm={8} spacing={3} >
          <Paper className={classes.paper}>
            <PostCard />
            <PostCard />
            <PostCard />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
