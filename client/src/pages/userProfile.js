import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import CakeIcon from '@material-ui/icons/Cake';
import EditProfileModal from '../components/createProfile';
import ManageProfileModal from '../components/ManageProfileModal';
import PostCard from '../components/PostCard';
import Spinner from '../components/Profile/Spinner';
import moment from 'moment';
import CreatePostDialog from '../components/CreatePostDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PanoramaFishEyeRoundedIcon from '@material-ui/icons/PanoramaFishEyeRounded';
import PostItem from '../components/posts/PostItem';
import createProfile from '../components/createProfile';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';
import { getProfilePosts } from '../actions/post';

import '../re.css';
import { post } from 'jquery';

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
    paddingTop: '10px',
    position: 'relative'
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
    borderRadius: '50%'
  }
});

const UserProfile = ({
  getCurrentProfile,
  getProfilePosts,
  match,
  user,
  profile: { profile, loading },
  posts
}) => {
  useEffect(() => {
    getCurrentProfile(match.params.id);
    getProfilePosts(match.params.id);
  }, [getCurrentProfile, getProfilePosts, match.params.id]);

  console.log(user && user._id);
  const classes = useStyles();
  const classesImg = useStylesImg();
  if (loading && profile === null) {
    return <Spinner />;
  } else if (profile === null) {
    return user && user._id === match.params.id ? (
      <EditProfileModal buttonType={'Create Profile'} hasProfile={false} />
    ) : (
      <div>
        <Typography
          variant='h3'
          align='left'
          style={{ textAlign: 'left', textTransform: 'capitalize' }}
        >
          Error 404 !!
        </Typography>
        <br />
        <Typography variant='h6' align='left' style={{ textAlign: 'left' }}>
          Profile does not exist!
        </Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4}>
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
                  alt='girl-logo'
                />
                <ManageProfileModal />
                <Typography
                  variant='h4'
                  style={{
                    textTransform: 'capitalize',
                    width: '95%',
                    marginBottom: '1rem'
                  }}
                >
                  {`${profile.user && profile.user.firstName} ${
                    profile.user && profile.user.lastName
                  }`}
                </Typography>
                <div style={{ marginBottom: '0.4rem' }}>
                  {user && user._id === match.params.id ? (
                    <EditProfileModal
                      buttonType='Edit Profile'
                      hasProfile={true}
                      bio={profile ? profile && profile.bio : ''}
                      interests={profile ? profile && profile.interests : ''}
                      location={profile ? profile && profile.location : ''}
                      visitedCountries={
                        profile ? profile && profile.visitedCountries : ''
                      }
                    />
                  ) : null}
                </div>
                <ManageProfileModal />
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
                    profile.interests.length > 0 &&
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
              <div style={{ marginBottom: '0.4rem' }}>
                <EditProfileModal
                  buttonType='Edit Profile'
                  hasProfile={true}
                  bio={profile ? profile && profile.bio : ''}
                  interests={profile ? profile && profile.interests : ''}
                  location={profile ? profile && profile.location : ''}
                  visitedCountries={
                    profile ? profile && profile.visitedCountries : ''
                  }
                />
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
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
              {/* this is where the post are being rendered */}
              {post.loading ? (
                <Spinner />
              ) : (
                <div className='posts'>
                  {posts.length > 0 &&
                    posts.map(post => <PostItem key={post._id} post={post} />)}
                </div>
              )}
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
  getProfilePosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  posts: state.post.posts
});

export default connect(mapStateToProps, { getCurrentProfile, getProfilePosts })(
  UserProfile
);
