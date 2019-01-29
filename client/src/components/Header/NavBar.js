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
import styles from './styles';




function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.appBar}>
      <AppBar position="static">
        <Toolbar>
          <img className={classes.label} src={logo} />
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <div className={classes.headerBar}>
          </div>
          <Button color="inherit">
          <AddCircle />
          Share Something
          </Button>
          <Button 
           style={{ borderRadius: "70%" }}
          color="inherit">
          <MoreVert />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
