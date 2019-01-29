import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles';


const ShareItemPreview = ({ classes, item}) => {

  ShareItemPreview.defaultProps = {
    name: 'abc',

    description: 'abc'

  }

  return (
    <Card style={{ width: '400px', marginTop: '50px' }} className={classes.card}>
      <Fragment>
      
        <CardMedia
          placeholder="Please select an image"
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <h2 className={classes.name}>Name your item </h2>
          </Typography>
          <Typography component="p">
          <p className={classes.description}>Describe your item </p>
          </Typography>
        </CardContent>
      </Fragment>
      <CardActions>
        <Button size="small" color="primary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
}

ShareItemPreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShareItemPreview);