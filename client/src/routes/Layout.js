import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import FullScreenLoader from '../components/FullScreenLoader/FulllScreenLoader';
import NavBar from '../components/Header/NavBar';

export default () => (
  <React.Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <FullScreenLoader inverted />;
        if (viewer) {
          return (
            <Fragment>
              <NavBar user={viewer}/>
            <Switch>
              <Route exact path="/items" component={Items} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/:userid" component={Profile} />
              <Route exact path="/share" component={Share} />
              <Redirect from="*" to="/items" />
            </Switch>
            </Fragment>
          );
        } else {
          return (
            <Switch>
              <Route exact path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
      }}
    </ViewerContext.Consumer>
  </React.Fragment>
);
