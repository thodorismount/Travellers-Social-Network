import React, { useState, Fragment } from 'react';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapsSelector from '../MapsSelector';
import CreateUploadImage from '../uploadImage';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import '../Navbar.css';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

// redux
import { editPost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import {editPost} from '../actions/post.js'

const EditPostDialog = props => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    text: props.text ? props.text : '',
    location: props.location ? props.location : ''
  });

  const stopPropagationForTab = event => {
    if (event.key === 'd' || event.key === 'Tab') {
      event.stopPropagation();
    }
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLocationChange = v => {
    setFormData({ ...formData, location: v ? v.terms[0].value : '' });
  };

  const handleTextField = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.editPost(props.id, formData);
  };

  console.log(props.id);
  return (
    <Fragment>
      <MenuItem onClick={handleToggle}>
        <EditRoundedIcon style={{ color: 'rgba(232, 126, 4, 1)' }} />
        Edit Post
      </MenuItem>
      <Dialog
        onKeyDown={stopPropagationForTab}
        open={open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit your travel post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              value={formData.text}
              id='postTextField'
              autoFocus
              name='text'
              onChange={handleTextField}
              multiline
              style={{ width: 500 }}
              rows={5}
              margin='normal'
              variant='outlined'
              placeholder='Hey traveller! Write your story'
              required
            />
            <MapsSelector
              label='Select location'
              onChange={handleLocationChange}
              prevLoc={props.location}
              required
            />

            <CreateUploadImage />

            <DialogActions>
              <Button color='primary' variant='outlined' onClick={handleToggle}>
                Cancel
              </Button>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                disabled={formData.location === '' || formData.text === ''}
              >
                Post
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

EditPostDialog.propTypes = {
  editPost: PropTypes.func.isRequired
};

export default connect(null, { editPost })(EditPostDialog);

//export defualt connect (null, editPost)(EditPostDialog);
