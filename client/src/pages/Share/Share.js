import { withStyles, Grid, Hidden } from '@material-ui/core';
import React from 'react';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import PropTypes from 'prop-types';

const Share = ({ classes, tags }) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      className={classes.container}
      spacing={8}
    >
      <Hidden xsDown>
        <Grid item xs={6} className={classes.preview}>
          <ShareItemPreview />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={6} className={classes.form}>
        <ShareItemForm tags={tags} />
      </Grid>
    </Grid>
  );
};

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired
};

export default withStyles(styles)(Share);
