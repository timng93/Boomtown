import React from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import Gravatar from 'react-gravatar';
import {
  Typography,
  Paper,
  CardHeader,
  Card,
  Grid,
  CardContent
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Profile = ({ classes, profile }) => {
  return (
    <div>
      <div>
        <Paper className={classes.paper}>
          <Card>
            <CardHeader
              className={classes.header}
              avatar={
                <Gravatar className={classes.avatar} email={profile.email} />
              }
              title={
                <Typography className={classes.name}>
                  {profile.fullname}
                </Typography>
              }
            />
            <CardContent>
              <Typography component="p">
                <span style={{ fontWeight: '800' }}>
                  {' '}
                  {profile.items.length}{' '}
                </span>{' '}
                Items shared.{' '}
                <span style={{ fontWeight: '800' }}>
                  {profile.borrowed.length}
                </span>{' '}
                Items borrowed.
              </Typography>
              <Typography component="h2">{profile.bio}</Typography>
            </CardContent>
          </Card>
        </Paper>
      </div>

      <div>
        <Typography component="h1" className={classes.title}>
          Shared Items
        </Typography>
      </div>

      <div>
        <Grid className={classes.grid} container spacing={24}>
          {profile.items.map(item => {
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
      </div>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default Profile;
