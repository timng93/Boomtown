import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../images/boomtown.svg';
import AddCircle from '@material-ui/icons/AddCircle';
import MoreVert from '@material-ui/icons/MoreVert';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { Link, withRouter } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import styles from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';

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
  classes: PropTypes.object.isRequired
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
