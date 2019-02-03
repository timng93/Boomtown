import React, { Fragment } from 'react';

import ItemsCard from '../ItemsCard/ItemsCard';

import { connect } from 'react-redux';

import { ViewerContext } from '../../context/ViewerProvider';


const ShareItemPreview = ({ shareItemPreview }) => {
  return( 
    <ViewerContext.Consumer>
  
  {({ viewer }) => (

  <ItemsCard item={{...shareItemPreview, itemowner: viewer}}/>)}

  </ViewerContext.Consumer>
  )
};

const mapStateToProps = state => {
  //shareItemPreview: state.shareItemPreview
  return {
    ...state
  };
};

export default connect(mapStateToProps)(ShareItemPreview);
