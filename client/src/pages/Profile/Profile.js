import React from 'react';
import ItemsCard from '../../components/ItemsCard/ItemsCard';
import Grid from '@material-ui/core/Grid';



const Profile = ({ classes, profile}) => {
  return (
    <div>
    <h2>{profile.fullname}</h2>
    <p>  {profile.items.length} Items shared </p>
    <p> {profile.borrowed.length} Items borrowed</p>
    <p> {profile.bio} </p>
    <Grid className= {classes.grid} container spacing={24}>
    {console.log(profile)}
    {profile.items.map(item =>{
      return(
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
         <ItemsCard item = {item}/>
         </Grid>
      );
    })}
    </Grid>
    </div>
    
  );
};

export default Profile;


