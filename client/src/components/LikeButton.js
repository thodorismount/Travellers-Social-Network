import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const CheckboxLabels = props => {
  const [state, setState] = React.useState({});
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControlLabel
      //checked = 'true'   if the "checked" variable is true the component appears checked
      control={
        <Checkbox
          checked={props.like}
          name='checked'
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      }
      label='Like this post'
      onChange={handleChange}
    />
  );
};
export default CheckboxLabels;
