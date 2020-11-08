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

import '../re.css';

const ModalMessage = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile}
  }) => {
    useEffect(() => {
      getCurrentProfile();
    }, []);
    if(profile==null){
        return (
          <Typography style={{textTransform: 'capitalize'}} > {' '}
             Welcome {user && user.firstName} {user && user.lastName}! Please fill in your profile
          </Typography>
        );
    }
    else{
        return(
        <Typography>
          Edit your profile 
        </Typography>
            );
        }

        
    }
    ModalMessage.propTypes = {
        getCurrentProfile: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired
      };
      
      const mapStateToProps = state => ({
        auth: state.auth,
        profile: state.profile
      });
      
      export default connect(mapStateToProps, { getCurrentProfile })(ModalMessage);
  
  