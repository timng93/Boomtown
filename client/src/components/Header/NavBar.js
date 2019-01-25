import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../images/boomtown.svg'; // Path to your icons.svg
import AddCircle from '@material-ui/icons/AddCircle'; 
import MoreVert from '@material-ui/icons/MoreVert'; 


const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.appBar}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} />
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />

          <Button color="inherit">
          <AddCircle />
          Share Something
          </Button>
          <MoreVert />
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
