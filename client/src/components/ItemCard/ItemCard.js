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
import moment from 'moment';

const ItemCard = ({ classes, item }) => {
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
          subheader={moment(item.created).fromNow()}
        />
        <CardContent>
          <Typography
            component="h2"
            style={{ fontSize: '20px', fontWeight: '520' }}
          >
            {item.title}
          </Typography>
          <Typography component="p" style={{ color: '#999999' }}>
            {item.tags.map(tag => tag.title).join(', ')}
          </Typography>
          <Typography component="p" style={{ fontSize: '15px' }}>
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

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
