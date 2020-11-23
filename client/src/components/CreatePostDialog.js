import React, { useState, Fragment } from 'react';

//MUI
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapsSelector from '../components/MapsSelector';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import '../components/Navbar.css';
import '../App.css';
// images
import FileBase from 'react-file-base64';
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
    location: '',
    image: ''
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
      <Tooltip title='Create post'>
        <Fab id='post-button' color='primary' onClick={handleToggle}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <div
            style={{ fontFamily: 'Bahnschrift Condensed', fontSize: '1.5rem' }}
          >
            Create your travel post
          </div>
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
              required
            />
            <MapsSelector
              label='Select location'
              onChange={handleLocationChange}
              prevLoc={formData.location}
              required
            />

            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
            />

            <DialogActions>
              <Button
                color='primary'
                variant='outlined'
                onClick={handleToggle}
                style={{
                  fontFamily: 'Bahnschrift Condensed',
                  fontSize: '1.1rem'
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  fontFamily: 'Bahnschrift Condensed',
                  fontSize: '1.1rem'
                }}
                color='primary'
                disabled={
                  formData.location === '' ||
                  formData.text === '' ||
                  formData.image === ''
                }
                variant='contained'
                type='submit'
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

CreatePostDialog.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(CreatePostDialog);
