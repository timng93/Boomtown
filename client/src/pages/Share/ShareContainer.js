import React, { Component } from 'react';
import NavBar from '../../components/Header/NavBar';

import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
// import { Query } from 'react-apollo';
// import { } from '../../apollo/queries';
import ShareForm from "../../components/ShareItemForm/ShareItemForm";

class ShareContainer extends Component {
  render() {
    return (
      <div>
      <NavBar />
      {/*<Share />*/}
      <ShareForm />
      </div>
    );
  }
}

export default withStyles(styles)(ShareContainer);