import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  form: {
    //padding: '30px',
  },
  button: {
    margin: '10px 10px'
}
  
};

class FormDialog extends Component {
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
    const{classes} = this.props;
    return <Fragment>
    <Button variant="contained" size="large" color="primary" onClick={this.handleToggle} className={classes.button}>
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
          <form className={classes.form}>
            <TextField
              autoFocus
              name="firstName"
              margin="normal"
              id="firstName"
              label="First name"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="lastName"
              margin="normal"
              id="lastName"
              label="Last name"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="email"         
              margin="normal"
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField 
              name="password"
              margin="normal"
              id="password"
              label="Password" 
              type="password"
              variant="outlined" 
              fullWidth/>
            
            <TextField 
              name="confirmPassword"
              margin="normal"
              id="confirmPassword"
              label="Confirm password" 
              type="password"
              variant="outlined" 
              fullWidth/>

            <table>
              <tbody>
                <tr>
                  <td>
                  <CreateDatePicker/>
                  </td>
                  <td>
                  <CreateGenderSelector/>
                  </td>
                </tr>
              </tbody>
            </table>
            
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
export default withStyles(styles)(FormDialog);

  