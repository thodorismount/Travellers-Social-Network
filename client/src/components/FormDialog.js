import React, { Component, Fragment } from 'react';

//MUI 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateDatePicker from '../components/DatePicker';
import Grid from '@material-ui/core/Grid';
import CreateGenderSelector from '../components/GenderSelector';


export default class extends Component {
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
    <Button variant="contained" color="primary" onClick={this.handleToggle}>
      Sign Up
    </Button>
    
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
            autoFocus
            name="firstName"
            margin="dense"
            id="firstName"
            label="First name"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="lastName"
            margin="dense"
            id="lastName"
            label="Last name"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="email"         
            margin="dense"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField 
            name="password"
            margin="dense"
            id="password"
            label="Password" 
            type="password"
            variant="outlined" 
            fullWidth/>
          
          <TextField 
            name="confirmPassword"
            margin="dense"
            id="confirmPassword"
            label="Confirm password" 
            type="password"
            variant="outlined" 
            fullWidth/>
          
            <CreateDatePicker/>

            <CreateGenderSelector/>
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


  