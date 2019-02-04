import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import { Link, withRouter } from 'react-router-dom';
import Gravatar from 'react-gravatar';
const ItemsCard = ({ classes, item }) => {
  console.log(item);
  const dateCurrent = Date.now();
  const perMinute = 1000 * 60;
  const perHour = perMinute * 60;
  const perDay = perHour * 24;
  const dateDisplay = Math.round((dateCurrent - item.created) / perDay);

  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          component={Link}
          to={`/profile/${item.itemowner.id}`}
        />
        <CardContent>
          <Avatar ariel-label="user">
            {item.itemowner && <Gravatar email={item.itemowner.email} />}
          </Avatar>
          <Typography>{item.itemowner.fullname}</Typography>
          <Typography>
            {dateDisplay > 1
              ? dateDisplay + ' days ago'
              : dateDisplay + ' day ago'}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            <h2> {item.title} </h2>
          </Typography>
          <Typography component="p">
            <p> {item.tags.map(tag => tag.title)} </p>
            <p> {item.description}</p>
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
};

ItemsCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemsCard);
