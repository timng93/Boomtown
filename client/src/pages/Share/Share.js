import React from 'react';
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 
  and upload an image.

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
 import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
 import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';



 

const Share = ({ classes }) => {
  return (
    <div className={classes.share}>
      <div>
      <ShareItemPreview className={classes.preview}/>
      </div>
      <div>
      <ShareItemForm className={classes.form}/>
      </div>
     
    </div>
  );
};

export default Share;
