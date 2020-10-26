import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'; //type-checking variables 
import axios from 'axios';
import CreateSelectTravelExperience from '../components/SelectTravelExperience';
import MapsSelector from '../components/MapsSelector';
import CreateUploadImage from '../components/uploadImage';
import CreateProfileForm from '../components/createProfile';


//MUI 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import $ from "jquery";
import NavBar from "../components/NavBar";

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle:{
        margin: '20px'
    },
    textField:{
        margin: '10px auto auto auto'
    },
    button: {
        margin: '10px 10px'
    },
    card: {
        padding: '10px',
        marginTop: '5px',
        backgroundColor: '#F0F2F5'
      }
}


 class createUserProfile extends Component {
    constructor(){
        super();
        this.state = {
            interests: '',
            countriesVisited: '',
            loading: false,
            error: {}
        }
    }
    componentDidMount(){
        var contents = $('#appbar')[0];
        contents.style.display="none";
     }
  
     componentWillUnmount(){
        var contents = $('#appbar')[0];
        contents.style.display="flex";
     }
     
    handleSubmit =(event) => {
       event.preventDefault();
       this.setState({
           loading: true
       });
       const userData = {
           insterests: this.state.insterests,
           countriesVisited: this.state.password
       }
       axios.post('/createuserprofile' , userData)
           .then(res => {
               console.log(res.data);
               this.setState({
                   loading: false
               });
               this.props.history.push('/'); //successful submittion directs user to the homepage

           })
           .catch(err => {
               this.setState({
                   error: err.response.data,
                   loading: false
               })
           })
            };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container className = {classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Card className={classes.card}>
                    <Typography varient="h1" className={classes.pageTitle}>
                        Please Customize Your User Profile
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="interests" 
                        name="interests" 
                        type="interests" 
                        label="Interests e.g. travelling, hikinkg, .." 
                        className={classes.textField} 
                        // helperText={errors.interests}
                        // error={errors.interests ? true: false} 
                        value={this.state.interests} 
                        //onChange={this.handleChange} 
                        fullWidth/>
                        <Typography varient="h1" className={classes.pageTitle}>
                        Select places you've visited
                        </Typography>
                        <MapsSelector/>
                        <Typography varient="h1" className={classes.pageTitle}>
                        Select your Travel Experience
                        </Typography>
                        <CreateSelectTravelExperience/>
                        <Typography varient="h1" className={classes.pageTitle}>
                        Select your location
                        </Typography>
                        <MapsSelector/>
                        <Typography varient="h1" className={classes.pageTitle}>
                        Upload Profile Picture
                        </Typography>
                        <CreateUploadImage/>
                        <Button type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                            Submit </Button>
                    </form>
                    </Card>
                </Grid> 
                <Grid item sm/>
            </Grid>
            
        );
    }
}

createUserProfile.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(createUserProfile);
