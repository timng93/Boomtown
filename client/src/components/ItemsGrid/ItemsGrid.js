import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const ItemsGrid = ({classes, data}) => {
  return(
    <Grid className= {classes.grid} container spacing={24}>
    {data.items.map((data, index) => {
      return(
        <Grid item xs={12} item={data.item} key={index} className={classes.gridItem}>
         <Card item={data.item} key={index} className={classes.card}>xs=12</Card>
         </Grid>
      );
    })}
    </Grid>
  );
};

export default withStyles(styles)(ItemsGrid);

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
