import React, { Component } from 'react';
import NavBar from '../../components/Header/NavBar';

import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader/FulllScreenLoader';

 import { Query } from 'react-apollo';
 import { Mutation } from 'react-apollo';

 import {ALL_TAGS_QUERY } from '../../apollo/queries';
 import {ADD_ITEM_MUTATION } from '../../apollo/queries';


class ShareContainer extends Component {
  render() {
    return (
      <div>
      <NavBar />
      {
        /*
      <Mutation variables={{ filter: -1 }} mutation={ADD_ITEM_MUTATION}>
        {({ loading, error, data }) => {
         
         if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          return <Share classes={this.props.classes} addItem={data} />;
        }}
      </Mutation>
      */
      }

      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
         
         if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          return <Share classes={this.props.classes} tags={data.tags} />;
        }}
      </Query>
      {/*<Share />*/}
      </div>
    );
  }
}

export default withStyles(styles)(ShareContainer);