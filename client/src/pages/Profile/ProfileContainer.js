import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader/FulllScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    const id = this.props.match.params.userid;

    return (
      <div>
        <Query variables={{ id: id }} query={ALL_USER_ITEMS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <FullScreenLoader inverted />;
            if (error) return <p>{`Error! ${error.message}`}</p>;
            console.log(data);
            return <Profile classes={this.props.classes} profile={data.user} />;
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
