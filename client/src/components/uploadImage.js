import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'; //type-checking variables 
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    button: {
        margin: '10px 0px'
    }
}

class uploadImage extends Component {
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    render() {
        const {classes} = this.props;
        return (
          <div>
              <input type="file" 
              id="imageInput" 
              //onChange={this.handleImageChange}
              hidden="hidden"
              />
            <Button onClick={this.handleEditPicture} className={classes.button} variant="outlined">
                 Choose File </Button>
          </div>
        )
    }

}
uploadImage.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(uploadImage);