import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader/FulllScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';
import PropTypes from 'prop-types';

class ShareContainer extends Component {
  render() {
    return (
      <div>
        <Query query={ALL_TAGS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <FullScreenLoader inverted />;
            if (error) return <p>{`Error! ${error.message}`}</p>;
            return <Share classes={this.props.classes} tags={data.tags} />;
          }}
        </Query>
      </div>
    );
  }
}

ShareContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareContainer);
