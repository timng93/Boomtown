import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';

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

export default connect(mapStateToProps)(ShareItemPreview);
