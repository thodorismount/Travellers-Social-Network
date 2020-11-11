import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    backgroundColor: 'transparent',
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <Fragment>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress fontSize='large' />
      </Backdrop>
    </Fragment>
  );
}
