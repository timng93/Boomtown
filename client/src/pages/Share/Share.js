import React from 'react';
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';
import Hidden from '@material-ui/core/Hidden';

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.share}>
      <div>
        <Hidden only="sm">
          <ShareItemPreview className={classes.preview} />
        </Hidden>
      </div>
      <div>
        <ShareItemForm className={classes.form} tags={tags} />
      </div>
    </div>
  );
};

export default Share;
