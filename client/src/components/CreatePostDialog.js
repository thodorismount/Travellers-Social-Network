  
import React, { useState, Fragment } from 'react';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapsSelector from '../components/MapsSelector';
import CreateUploadImage from '../components/uploadImage';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import '../components/Navbar.css';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../actions/post';

const CreatePostDialog = ({ addPost }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLocationChange = v => {
    setFormData({ ...formData, location: v ? v.terms[0].value : '' });
  };

  const [formData, setFormData] = useState({
    text: '',
    location: ''
  });

  const handleTextField = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addPost(formData);
  };

  return (
    <Fragment>
      <Fab
        color='primary'
        onClick={handleToggle}
        title='Create post'
        style={{
          position: 'fixed',
          top: '7rem',
          right: '15%'
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Create your travel post
        </DialogTitle>
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
            />
            <MapsSelector
              label='Select location'
              onChange={handleLocationChange}
              prevLoc={formData.location}
            />

            <CreateUploadImage />

            <DialogActions>
              <Button color='primary' variant='outlined' onClick={handleToggle}>
                Cancel
              </Button>
              <Button color='primary' variant='contained' type='submit'>
                Post
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

CreatePostDialog.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(CreatePostDialog);