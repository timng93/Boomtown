import React, { Fragment } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

const ItemsCard = ({ classes, item }) => {
  const dateCurrent = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;
  const dateDisplay = Math.round((dateCurrent - item.created) / oneDay);

  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          component={Link}
          to={`/profile/${item.itemowner.id}`}
        />

        <CardHeader
          style={{ left: 32 }}
          avatar={
            <Gravatar
              email={item.itemowner.email}
              style={{ borderRadius: '50%' }}
            />
          }
          title={item.itemowner.fullname}
          subheader={
            dateDisplay > 1
              ? dateDisplay + ' days ago'
              : dateDisplay + ' day ago'
          }
        />
        <CardContent>
          <Typography
            component="h2"
            style={{ fontSize: '18px', color: 'purple' }}
          >
            {item.title}
          </Typography>
          <Typography component="p" style={{ color: 'blue' }}>
            {item.tags.map(tag => tag.title).join(', ')}
          </Typography>
          <Typography component="p" style={{ fontSize: '16px' }}>
            {item.description}
          </Typography>
        </CardContent>
      </Fragment>
      <CardActions>
        <Button size="small" variant="outlined">
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
