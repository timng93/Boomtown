import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader/FulllScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { Button } from '@material-ui/core';



class ItemsContainer extends Component {
  render() {
    return (
      <div>
      <Query variables={{ filter: -1 }} query={ALL_ITEMS_QUERY}>
        {({ loading, error, data }) => {
         
         if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          return <Items classes={this.props.classes} items={data.items} />;
        }}
      </Query>
      </div>
    );
  }
}

//<Items classes={this.props.classes} items={data.items} />
export default withStyles(styles)(ItemsContainer);

