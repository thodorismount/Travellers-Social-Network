import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import defaultAvatar from '../components/empty_avatar.png';
import Tooltip from '@material-ui/core/Tooltip';
import ScrollTop from '../components/ScrollTop';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';
import { getProfilePosts } from '../actions/post';
import { fetchMoreProfile } from '../actions/post';

import '../re.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 6,
    fontFamily: 'Bahnschrift Condensed',
    ['@media only screen and (max-width:550px)']: { paddingTop: '3rem' }
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
    marginLeft: '-2rem',
    fontFamily: 'Bahnschrift Condensed'
  },
  expand: {
    transform: 'rotate(0deg)',
    left: '45%',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  profilePic: {
    backgroundImage:
      'url(' +
      'https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' +
      ')'
  },
  postInProfile: {
    width: '100%',
    backgroundColor: '#F0F2F5',
    height: '85vh',
    ['@media only screen and (min-width:550px)']: { padding: '2rem' },
    ['@media only screen and (max-width:550px)']: { padding: '0' },
    overflowY: 'scroll'
  }
}));

const UserProfile = ({
  getCurrentProfile,
  getProfilePosts,
  fetchMoreProfile,
  match,
  postsLoading,
  user,
  profile: { profile, loading },
  posts
}) => {
  const [skip, setSkip] = useState({ skip: 2 });
  const [expanded, setExpanded] = useState(false); //for visited countries
  const [expandedInt, setExpandedInt] = useState(false); //for interests

  const handleScroll = e => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop + 200 >= scrollHeight) {
      setSkip({ skip: skip.skip + 2 });
      fetchMoreProfile(match.params.id, skip.skip);
    }
  };

  useEffect(() => {
    getCurrentProfile(match.params.id);
    getProfilePosts(match.params.id);
    var foot = $('#footer')[0];
    foot.style.display = 'none';
  }, [getCurrentProfile, getProfilePosts, match.params.id]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandIntClick = () => {
    setExpandedInt(!expandedInt);
  };
  const classes = useStyles();
  if (loading) {
    return <Spinner />;
  } else if (profile === null) {
    return user && user._id === match.params.id ? (
      <div
        style={{ color: '#9BA5A3', fontFamily: 'Bahnschrift Condensed' }}
        justify={'center'}
      >
        <EditProfileModal
          buttonType={'Create Profile'}
          edit={false}
          hasProfile={false}
          disableOutsideClick={true}
          disableCancelButton={true}
          hideButton='none'
        />
        <div style={{ fontSize: 'large' }}>
          <Typography
            variant='h6'
            style={({ justifyContent: 'center' }, { textAlign: 'center' })}
          >
            Nothing to see yet!
          </Typography>
        </div>
      </div>
    ) : (
      <div
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          color: '#9BA5A3',
          paddingTop: '1rem',
          fontFamily: 'Bahnschrift Condensed'
        }}
        justify='center'
      >
        <Typography
          variant='h6'
          style={{ justifyContent: 'center', textAlign: 'center' }}
        >
          Nothing to see here! This profile doesn't exist!
        </Typography>
        <img
          src={spinningEarth}
          alt='Loading...'
          style={{ width: '400px', margin: 'auto', display: 'block' }}
        />
        <Button
          color='primary'
          variant='contained'
          size='large'
          component={Link}
          to='/home'
        >
          Back to Home
        </Button>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes.paper} variant='elevation'>
              <div
                className='raised'
                style={{
                  backgroundColor: '#F0F2F5',
                  borderRadius: '2%',
                  paddingTop: '5px'
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      profile.avatar ? profile.avatar : defaultAvatar
                    })`,
                    width: '250px',
                    height: '250px',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '50%',
                    marginLeft: '15%',
                    marginRight: '15%',
                    marginBottom: '0.8rem'
                  }}
                ></div>
                {user && user._id === match.params.id ? (
                  <ManageProfileModal
                    firstName={user && user.firstName}
                    lastName={user && user.lastName}
                    birthDate={user && user.birthDate}
                    gender={user && user.gender}
                  />
                ) : null}
                <Typography
                  variant='h4'
                  style={{
                    textTransform: 'capitalize',
                    width: '95%',
                    marginBottom: '1rem',
                    fontFamily: 'Bahnschrift Condensed'
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
                style={{
                  textAlign: 'left',
                  marginBottom: '0.5rem',
                  fontFamily: 'Bahnschrift Condensed'
                }}
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
                    profile.visitedCountries.slice(0, 3).map(country => (
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
                  <Collapse in={expanded} timeout='auto' unmountOnExit>
                    {profile &&
                      profile.visitedCountries &&
                      profile.visitedCountries
                        .slice(3, profile.visitedCountries.length)
                        .map(country => (
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
                  </Collapse>
                  {profile &&
                  profile.visitedCountries &&
                  profile.visitedCountries.length > 3 ? (
                    <Tooltip title='Show more'>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='show more'
                      >
                        <ExpandMoreIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <div></div>
                  )}
                </List>
                <List
                  dense={true}
                  subheader='Interests:'
                  style={{ marginBottom: '0.4rem' }}
                >
                  {profile &&
                    profile.interests &&
                    profile.interests.length > 0 &&
                    profile.interests[0]
                      .split(',')
                      .slice(0, 3)
                      .map(interest => (
                        <ListItem key={Math.random() * 100}>
                          <ListItemIcon>
                            <PanoramaFishEyeRoundedIcon
                              style={{ fontSize: '0.8rem' }}
                              color='primary'
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={interest}
                            classes={{ primary: classes.ListItemText }}
                          ></ListItemText>
                        </ListItem>
                      ))}
                  <Collapse in={expandedInt} timeout='auto' unmountOnExit>
                    {profile &&
                      profile.interests &&
                      profile.interests[0]
                        .split(',')
                        .slice(3, profile.interests[0].length)
                        .map(country => (
                          <ListItem key={Math.random() * 100}>
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
                  </Collapse>
                  {profile &&
                  profile.interests &&
                  profile.interests[0].split(',').length > 3 ? (
                    <Tooltip title='Show more'>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expandedInt
                        })}
                        onClick={handleExpandIntClick}
                        aria-expanded={expandedInt}
                        aria-label='show more'
                      >
                        <ExpandMoreIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <div></div>
                  )}
                </List>
              </Typography>
              <div style={{ marginBottom: '0.4rem' }}>
                {user && user._id === match.params.id ? (
                  <EditProfileModal
                    buttonType='Edit Profile'
                    hasProfile={true}
                    edit={true}
                    hideButton=''
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
          <Grid item xs={12} sm={12} md={7} justify='flex-start' container>
            <Paper
              className={classes.postInProfile}
              justify='center'
              onScroll={handleScroll}
              id='postsPaper'
            >
              {/* this is where the post are being rendered */}
              {postsLoading ? (
                <Spinner />
              ) : (
                <div className='posts'>
                  <div id='back-to-top-anchor'></div>
                  {posts.length > 0 &&
                    posts.map(post => <PostItem key={post._id} post={post} />)}
                </div>
              )}
              <ScrollTop>
                <Fab
                  color='primary'
                  size='small'
                  aria-label='scroll back to top'
                  style={{ position: 'fixed', bottom: '3rem', right: '15%' }}
                >
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  posts: state.post.posts,
  postsLoading: state.post.loading
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProfilePosts,
  fetchMoreProfile
})(UserProfile);
