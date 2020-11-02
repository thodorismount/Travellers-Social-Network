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

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';

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
    maxWidth: '100%',
    maxHeight: '100%',
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
      <div>
        <Typography
          variant='h6'
          align='left'
          style={{ textAlign: 'left' }}
        ></Typography>
        <p>
          Welcome {user && user.firstName} {user && user.lastName}
          <EditProfileModal />
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
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
                  src='static/images/obama.png'
                />
                <Typography
                  variant='h4'
                  style={{ textTransform: 'uppercase', width: '95%' }}
                >
                  {`${user && user.firstName} ${user && user.lastName}`}
                </Typography>
                <EditProfileModal />
              </div>
              <Typography
                variant='h6'
                gutterBottom
                align='left'
                style={{ textAlign: 'left' }}
              >
                {profile && profile.bio}
                <br />
                <RoomIcon />
                {profile && profile.location}
                <br />
                <CakeIcon />
                {moment(user && user.birthDate).format('DD-MM-YYYY')}
                <br />
                Travel Experience: {profile && profile.travelExperience}/5
                <br />
                <List dense={true} subheader='Countries visited:'>
                  {profile &&
                    profile.visitedCountries.map(countries => (
                      <ListItem key={countries}>
                        <ListItemIcon>
                          <PanoramaFishEyeRoundedIcon
                            style={{ fontSize: '0.8rem' }}
                            color='primary'
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={countries}
                          classes={{ primary: classes.ListItemText }}
                        >
                          {/* <Typography variant='h6'>{inte}</Typography> */}
                        </ListItemText>
                      </ListItem>
                    ))}
                </List>
                <List dense={true} subheader='Interests:'>
                  {profile &&
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
            xs={8}
            md={8}
            justify='center'
            container
            //className={'postContainer'}
          >
            <Paper
              justify='center'
              style={{
                width: '80%',
                backgroundColor: '#F0F2F5'
              }}
            >
              <PostCard />
              <PostCard />
              <PostCard />
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
