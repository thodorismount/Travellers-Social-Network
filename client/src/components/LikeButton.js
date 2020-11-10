import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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
