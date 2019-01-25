import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemsCard from '../ItemsCard/ItemsCard'
import styles from './styles'



const ItemsGrid = ({classes, items}) => {
  return(
    <Grid className= {classes.grid} container spacing={24}>
    {console.log(items)}
    {items.map(item =>{
      return(
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
         <ItemsCard item = {item}/>
         </Grid>
      );
    })}
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemsGrid);




