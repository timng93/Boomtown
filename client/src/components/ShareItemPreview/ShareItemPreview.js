import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';
import PropTypes from 'prop-types';

const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => (
        <ItemCard item={{ ...shareItemPreview, itemowner: viewer }} />
      )}
    </ViewerContext.Consumer>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

ShareItemPreview.propTypes = {
  shareItemPreview: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ShareItemPreview);
