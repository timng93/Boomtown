import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';
import { Typography } from '@material-ui/core';


class FullScreenLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

    const { classes } = this.props;


    return (
      <div>
      <CircularProgress className={classes.progress} color="secondary" />
      <Typography className={classes.loader}> Hold Up. Page is Loading </Typography>
    
      </div>
    );
  }
}

FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (FullScreenLoader); 