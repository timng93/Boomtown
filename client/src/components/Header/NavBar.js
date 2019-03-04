import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/boomtown.svg';
import { Link, withRouter } from 'react-router-dom';
import styles from './styles';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import {
  AddCircle,
  MoreVert,
  Fingerprint,
  PowerSettingsNew
} from '@material-ui/icons';
import {
  withStyles,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Slide,
  Menu,
  MenuItem
} from '@material-ui/core';

class NavBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, location } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              href="/welcome"
            >
              <img className={classes.label} src={logo} alt="header-logo" />
            </IconButton>

            <div className={classes.headerBar} />
            <Slide
              direction="left"
              in={location.pathname !== '/share'}
              mountOnEnter
              unmountOnExit
            >
              <Button color="inherit" href="/share">
                <AddCircle />
                Share Something
              </Button>
            </Slide>

            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MoreVert />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={this.handleClose}
                component={Link}
                to={`/profile/${this.props.user.id}`}
              >
                <Fingerprint />
                Your Profile
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutMutation({});
                }}
              >
                <PowerSettingsNew />
                Log Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  logoutMutation: PropTypes.func.isRequired
};

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),
  withStyles(styles),
  withRouter
)(NavBar);
