import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RoomIcon from '@material-ui/icons/Room';
import CakeIcon from '@material-ui/icons/Cake';
import Button from '@material-ui/core/Button';
import EditProfileModal from '../components/createProfile';
import PostCard from '../components/PostCard';
import Divider from '@material-ui/core/Divider';
import Spinner from '../components/Profile/Spinner';
import moment from 'moment';
import CreatePostDialog from '../components/CreatePostDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PanoramaFishEyeRoundedIcon from '@material-ui/icons/PanoramaFishEyeRounded';
import $ from 'jquery';
import '../components/createProfile';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';

import '../re.css';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 6,
    paddingTop: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    justifyContent: 'center',
    height: 'auto',
    paddingTop: '10px'
  },
  card: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 'auto'
  },
  ListItemText: {
    fontSize: '1.1rem', //font size of rest profile info is 1.25 rem
    lineHeight: '0.7',
    marginLeft: '-2rem'
  }
}));

const useStylesImg = makeStyles({
  image: {
    maxWidth: '60%',
    maxHeight: '60%',
    margin: 'auto',
    borderRadius: '50%'
  }
});

const UserProfile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const classes = useStyles();
  const classesImg = useStylesImg();
  if (loading && profile === null) {
    return <Spinner />;
  } else if (profile === null) {
    return (
      
        <EditProfileModal hasProfile={false}/>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4}>
            <Paper className={classes.paper} variant='elevation'>
              <div
                style={{
                  backgroundColor: '#F0F2F5',
                  borderRadius: '2%',
                  paddingTop: '5px'
                }}
              >
                <img
                  className={classesImg.image}
                  src='girl_female_woman_avatar-512.png'
                />
                <Typography
                  variant='h4'
                  style={{
                    textTransform: 'capitalize',
                    width: '95%',
                    marginBottom: '1rem'
                  }}
                >
                  {`${user && user.firstName} ${user && user.lastName}`}
                </Typography>
                <div style={{ marginBottom: '0.4rem' }}>
                  <EditProfileModal buttonType='Edit Profile' hasProfile={true}/>
                </div>
              </div>
              <Typography
                variant='h6'
                gutterBottom
                align='left'
                style={{ textAlign: 'left', marginBottom: '0.5rem' }}
              >
                <div style={{ marginBottom: '0.4rem' }}>
                  {profile && profile.bio}
                </div>
                <div style={{ marginBottom: '0.4rem' }}>
                  <RoomIcon color='primary' style={{ marginRight: '1rem' }} />
                  {profile && profile.location}
                </div>
                <div style={{ marginBottom: '0.4rem' }}>
                  <CakeIcon color='primary' style={{ marginRight: '1rem' }} />
                  {moment(user && user.birthDate).format('DD-MM-YYYY')}
                </div>
                <div style={{ marginBottom: '0.4rem' }}>
                  Travel Experience: {profile && profile.travelExperience}/5
                </div>
                <List
                  dense={true}
                  subheader='Countries visited:'
                  style={{ marginBottom: '0.4rem' }}
                >
                  {profile &&
                    profile.visitedCountries &&
                    profile.visitedCountries.map(country => (
                      <ListItem key={country}>
                        <ListItemIcon>
                          <PanoramaFishEyeRoundedIcon
                            style={{ fontSize: '0.8rem' }}
                            color='primary'
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={country}
                          classes={{ primary: classes.ListItemText }}
                        ></ListItemText>
                      </ListItem>
                    ))}
                </List>
                <List
                  dense={true}
                  subheader='Interests:'
                  style={{ marginBottom: '0.4rem' }}
                >
                  {profile &&
                    profile.interests &&
                    profile.interests.map(interest => (
                      <ListItem key={interest}>
                        <ListItemIcon>
                          <PanoramaFishEyeRoundedIcon
                            style={{ fontSize: '0.8rem' }}
                            color='primary'
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={interest}
                          classes={{ primary: classes.ListItemText }}
                        >
                          {/* <Typography variant='h6'>{inte}</Typography> */}
                        </ListItemText>
                      </ListItem>
                    ))}
                </List>
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={7}
            md={7}
            justify='flex-start'
            container
            //className={'postContainer'}
          >
            <Paper
              justify='center'
              style={{
                width: '100%',
                backgroundColor: '#F0F2F5'
              }}
            >
              <PostCard
                caption='Throwback to my trip in Morocco'
                username={`${user && user.firstName}  ${user && user.lastName}`}
                image='static/images/morocco.jpg'
                location='Morocco'
                date='October 14, 2020'
              />
              <PostCard
                caption='Looking forward for my next flight to Paris'
                username={`${user && user.firstName}  ${user && user.lastName}`}
                image='static/images/paris.jpg'
                location='Paris'
                date='September 9, 2020'
              />
              <PostCard
                caption='Any good restaurants in NY?'
                username={`${user && user.firstName}  ${user && user.lastName}`}
                image='static/images/newYork.jpg'
                location='New York'
                date='May 19, 2020'
              />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={1}>
            <CreatePostDialog />
          </Grid>
        </Grid>
      </div>
    );
  }
};

UserProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(UserProfile);
