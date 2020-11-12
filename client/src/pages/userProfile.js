import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import CakeIcon from '@material-ui/icons/Cake';
import EditProfileModal from '../components/createProfile';
import ManageProfileModal from '../components/ManageProfileModal';
import Spinner from '../components/Profile/Spinner';
import moment from 'moment';
import CreatePostDialog from '../components/CreatePostDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PanoramaFishEyeRoundedIcon from '@material-ui/icons/PanoramaFishEyeRounded';
import PostItem from '../components/posts/PostItem';
import $ from 'jquery';
import spinningEarth from '../components/Profile/spinningEarth.gif';
import '../App.css';
import CountriesVisitedProgressBar from '../components/CountriesVisitedProgressBar';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';
import { getProfilePosts } from '../actions/post';
import { fetchMoreProfile } from '../actions/post';

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
  fetchMoreProfile,
  match,
  user,
  profile: { profile, loading },
  posts
}) => {
  const [skip, setSkip] = useState(2);
  const handleScroll = e => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(skip + 2);
      fetchMoreProfile(match.params.id, skip);
    }
  };
  useEffect(() => {
    getCurrentProfile(match.params.id);
    getProfilePosts(match.params.id);
    var foot = $('#footer')[0];
    foot.style.display = 'none';
  }, [getCurrentProfile, getProfilePosts, match.params.id]);

  const classes = useStyles();
  const classesImg = useStylesImg();
  if (loading && profile === null) {
    return <Spinner />;
  } else if (profile === null) {
    return user && user._id === match.params.id ? (
      <div style={{ color: '#9BA5A3' }} justify={'center'}>
        <EditProfileModal
          buttonType={'Create Profile'}
          hasProfile={false}
          disableOutsideClick={true}
          disableCancelButton={true}
        />
        <div style={{ fontSize: 'large' }}>
          <Typography
            variant='h6'
            style={({ justifyContent: 'center' }, { textAlign: 'center' })}
          >
            Nothing to see yet!
          </Typography>
        </div>
        <img
          src={spinningEarth}
          style={{ width: '400px', margin: 'auto', display: 'block' }}
        />
      </div>
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
                  src='../static/images/obama.png'
                  alt='girl-logo'
                />
                {user && user._id === match.params.id ? (
                  <ManageProfileModal />
                ) : null}
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
                  {moment(
                    profile && profile.user && profile.user.birthDate
                  ).format('DD-MM-YYYY')}
                </div>
                <div style={{ marginBottom: '0.4rem' }}>Travel Experience:</div>
                <CountriesVisitedProgressBar
                  travelExperience={
                    profile && profile.travelExperience
                      ? profile.travelExperience
                      : 0
                  }
                />
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
                    profile.interests.length > 0 &&
                    profile.interests[0].split(',').map(interest => (
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
                {user && user._id === match.params.id ? (
                  <EditProfileModal
                    buttonType='Edit Profile'
                    hasProfile={true}
                    disableOutsideClick={false}
                    disableCancelButton={false}
                    bio={profile ? profile && profile.bio : ''}
                    interests={profile ? profile && profile.interests : ''}
                    location={profile ? profile && profile.location : ''}
                    visitedCountries={
                      profile ? profile && profile.visitedCountries : ''
                    }
                  />
                ) : null}
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
              onScroll={handleScroll}
              style={{
                width: '100%',
                backgroundColor: '#F0F2F5',
                backgroundColor: '#F0F2F5',
                height: '85vh',
                padding: '2rem',
                overflowY: 'scroll'
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
            <div style={{ marginBottom: '0.4rem' }}>
              {user && user._id === match.params.id ? (
                <CreatePostDialog />
              ) : null}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};

UserProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfilePosts: PropTypes.func.isRequired,
  fetchMoreProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  posts: state.post.posts
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfilePosts,
  fetchMoreProfile
})(UserProfile);
