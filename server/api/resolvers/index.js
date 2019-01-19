
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Upload: UploadScalar,
    Date: DateScalar,

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
        
      },

      async tags(parent, args, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      
      async items(user, args, { pgResource }) {
        try {
          const userItems = await pgResource.getItemsForUser(user.id);
          return userItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      
      },
      async borrowed(user, args, { pgResource }) {
        try {
          const borrowedItems = await pgResource.getBorrowedItemsForUser(
            user.id
          );
          return borrowedItems;
        } catch (e) {
          throw new ApolloError(e);
        }
       
      }
      // -------------------------------
    },

    Item: {
      async itemowner(item, args, { pgResource }) {
        try {
          const itemOwner = await pgResource.getUserById(item.ownerid);
          return itemOwner;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      
       
      async tags(item, args, { pgResource }) {
        try {
          const itemTags = await pgResource.getTagsForItem(item.id);
          return itemTags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

     
      async borrower(item, args, { pgResource }) {
        try {
          const itemBorrower = await pgResource.getUserById(item.borrowerid);
          return itemBorrower;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

   /*
     async imageurl({ imageurl, imageid, mimetype, data }) {
     if (imageurl) return imageurl
    if (imageid) {
     return `data:${mimetype};base64, ${data}`
     }
     },
     */
     
    // -------------------------------

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      // ...authMutations(app),
      // -------------------------------

      async addItem(parent, {filter}, {pgResource}, info) {
        

        image = await image;
        const user = await jwt.decode(pgResource.token, app.get('JWT_SECRET'));
        const newItem = await pgResource.saveNewItem({
          item: filter.item,
          image: filter.image,
          user
        });
        return newItem;
      }
    }
  };
};
