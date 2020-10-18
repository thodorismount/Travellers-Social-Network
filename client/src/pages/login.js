import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'; //type-checking variables 
import Link from 'react-router-dom';
import axios from 'axios';
import CreateformDialog from '../components/FormDialog'

//MUI 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {blue} from '@material-ui/core/colors';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto auto auto'
    },
    textField: {
        margin: '10px auto auto auto'
    },
    button: {
        margin: '10px 10px'
    },
    logo: {
        margin: '300px',
        height: 'auto',
        width: 'auto'

    },
    pageName: {
        margin: '180px auto auto auto',
        color: "blue"
    }
}


class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loading: false
                });
                this.props.history.push('/'); //successful login directs user to the homepage

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
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm>
                    <h1 className={classes.logo}>Logo</h1>
                </Grid>
                <Grid item sm>
                    <Typography varient="h1" className={classes.pageName}>
                        Page Name
                    </Typography>
                    <Typography varient="h1" className={classes.pageTitle}>
                        Please Login or Sign up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email"
                                   name="email"
                                   type="email"
                                   label="Email"
                                   className={classes.textField}
                            // helperText={errors.email}
                            // error={errors.email ? true: false}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth/>
                        <TextField id="password"
                                   name="password"
                                   type="password"
                                   label="Password"
                                   className={classes.textField}
                            // helperText={errors.password}
                            // error={errors.password ? true: false}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth/>
                        <Button type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}>
                            Login
                        </Button>
                        <CreateformDialog/>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>

        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(login);
