import React, { Component, Fragment } from 'react';

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

class CreatePostDialog extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <Fab
          color='primary'
          onClick={this.handleToggle}
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
          onClose={this.handleToggle}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            Create your travel post
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
                It’s quick and easy.
            </DialogContentText> */}
            <form>
              <TextField
                fullWidth
                id='postTextField'
                autoFocus
                name='postTextField'
                multiline
                style={{ width: 500 }}
                rows={5}
                margin='normal'
                // defaultValue="Hey traveller! Write your story"
                variant='outlined'
                placeholder='Hey traveller! Write your story'
              />
              <MapsSelector label='Select location' />

              <CreateUploadImage />

              <DialogActions>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={this.handleToggle}
                >
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
  }
}
export default CreatePostDialog;
