import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = makeStyles({
  root: {
    width: '100%'
  }
});

export default function CountriesVisitedProgressBar(props) {
  const classes = styles;

  return (
    <div className={classes.root}>
      <LinearProgress
        variant='determinate'
        value={props.travelExperience * 10}
        style={{
          height: '0.5rem',
          borderRadius: '10px',
          maxWidth: '400px'
        }}
      />
    </div>
  );
}
