import React, { Component, Fragment } from 'react';


//MUI 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CreateSelectCountry from '../components/selectCountry';
import CreateUploadImage from '../components/uploadImage';

class CreatePostDialog extends Component {
    state = {
      open: false
    }
  
    handleToggle = () =>{
      this.setState({
        open: !this.state.open
      })
    };
      
    render(){
      const { open } = this.state
      return <Fragment>
        <IconButton  variant="contained" color="primary" onClick={this.handleToggle}>
            <CreateRoundedIcon/>
        </IconButton >
        
        <Dialog 
        open={open} 
        onClose={this.handleToggle} 
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
            Join Travellers community
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                It’s quick and easy.
            </DialogContentText>
            <form>
                
               <TextField
                    fullWidth
                    id="postTextField"
                    autoFocus
                    name="postTextField"
                    multiline
                    rows={5}
                    defaultValue="Hey traveller! Write your story"
                    variant="outlined"
                />
                <CreateSelectCountry />
                <CreateUploadImage/>
            </form>
            </DialogContent>
            <DialogActions>
            <Button color="primary" onClick={this.handleToggle}>
                Cancel
            </Button>
            <Button color="primary">
                Sign Up
            </Button>
            </DialogActions>
        </Dialog>
        </Fragment>
        
    }
    }
export default (CreatePostDialog);