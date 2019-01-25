import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';



const Items = ({ classes, data }) => {
  return (
    <div>
      <p>
        This is the items page located at <code>/items</code>.
      </p>
      <ItemsGrid />
      
    </div>
  );
};

export default Items;

