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
import Typography from '@material-ui/core/Typography';

// images
import FileBase from 'react-file-base64';
// redux
import { editPost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import {editPost} from '../actions/post.js'

const EditPostDialog = props => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    text: props.text ? props.text : '',
    location: props.location ? props.location : '',
    image: props.image ? props.image : ''
  });

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
      <Button
        color='default'
        variant='text'
        size='medium'
        startIcon={
          <EditRoundedIcon style={{ color: 'rgba(232, 126, 4, 1)' }} />
        }
        onClick={handleToggle}
      >
        <Typography style={{ textTransform: 'capitalize' }}>
          Edit Post
        </Typography>
      </Button>

      <Dialog
        open={open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit your travel post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id='postTextField'
              autoFocus
              name='text'
              value={formData.text}
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
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
            />

            <DialogActions>
              <Button color='primary' variant='outlined' onClick={handleToggle}>
                Cancel
              </Button>
              <Button
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