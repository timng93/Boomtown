import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard/ItemCard';
import styles from './styles';

const ItemsGrid = ({ classes, items }) => {
  return (
    <Grid className={classes.grid} container spacing={24}>
      {items.map(item => {
        return (
          <Grid
            item
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            className={classes.gridItem}
          >
            <ItemCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(ItemsGrid);
