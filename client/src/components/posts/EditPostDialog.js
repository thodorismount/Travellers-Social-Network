import React, { useState, Fragment } from 'react';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MapsSelector from '../MapsSelector';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import '../Navbar.css';
import MenuItem from '@material-ui/core/MenuItem';
// images
import FileBase from 'react-file-base64';
// redux
import { editPost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditPostDialog = props => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    text: props.text ? props.text : '',
    location: props.location ? props.location : '',
    image: props.image ? props.image : ''
  });

  const stopPropagationForTab = event => {
    if (
      event.key === 'd' ||
      event.key === 'Tab' ||
      event.key === 'D' ||
      event.key === 'e' ||
      event.key === 'E'
    ) {
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

  return (
    <Fragment>
      <MenuItem
        onClick={handleToggle}
        style={{ fontFamily: 'Bahnschrift Condensed' }}
      >
        <EditRoundedIcon style={{ color: 'rgba(232, 126, 4, 1)' }} />
        Edit Post
      </MenuItem>
      <Dialog
        onKeyDown={stopPropagationForTab}
        open={open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle
          id='form-dialog-title'
          style={{ fontFamily: 'Bahnschrift Condensed' }}
        >
          <div
            style={{ fontFamily: 'Bahnschrift Condensed', fontSize: '1.5rem' }}
          >
            Edit your travel post
          </div>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            style={{ fontFamily: 'Bahnschrift Condensed' }}
          >
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
            <FileBase
              type='file'
              class={'inputfile'}
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
                variant='contained'
                type='submit'
                disabled={
                  formData.location === '' ||
                  formData.text === '' ||
                  formData.image === ''
                }
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
