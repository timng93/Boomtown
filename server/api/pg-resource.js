const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users( fullname, email, password) VALUES($1, $2, $3) RETURNING *', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1', // @TODO: Authentication - Server

        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT id, email, fullname, bio FROM users WHERE id = $1',

        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },

    async getItems(idToOmit) {
      const items = await postgres.query({
        text: `SELECT * FROM items ${idToOmit ? 'WHERE ownerid <> $1' : ''}`,

        values: idToOmit ? [idToOmit] : []
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE ownerid = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE borrowerid = $1`,
        values: [id]
      });
      return items.rows;
    },

    async getTags() {
      const tags = await postgres.query({
        text: 'SELECT id, name AS title FROM tags'
      });

      return tags.rows;
    },

    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT id, name AS title FROM tags WHERE id IN (SELECT tagid FROM itemtags WHERE itemid = $1) `,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },

    async saveNewItem({ item, user }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item to Posgtres is the most advanced query.
       *  It requires 3 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         */
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              // Convert image (file stream) to Base64
              // const imageStream = image.stream.pipe(strs('base64'));

              // let base64Str = '';
              // imageStream.on('data', data => {
              //   base64Str += data;
              // });

              // imageStream.on('end', async () => {
              // Image has been converted, begin saving things
              const { title, description, tags } = item;

              const newItemQuery = {
                text:
                  'INSERT INTO items(title, description, ownerid) VALUES ($1, $2, $3) RETURNING *',
                values: [title, description, user.id]
              };

              const insertNewItem = await postgres.query(newItemQuery);

              // const imageUploadQuery = {
              //   text:
              //     'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              //   values: [
              //     itemid,
              //     image.filename,
              //     image.mimetype,
              //     'base64',
              //     base64Str
              //   ]
              // };

              // Upload image
              // const uploadedImage = await client.query(imageUploadQuery);
              // const imageid = uploadedImage.rows[0].id;

              // Generate image relation query
              // @TODO
              // -------------------------------

              // Insert image
              // @TODO
              // -------------------------------

              const tagRelationshipQuery = {
                text: `INSERT INTO itemtags(tagid, itemid) VALUES ${tagsQueryString(
                  [...tags],
                  insertNewItem.rows[0].id,
                  ''
                )}`,
                values: tags.map(tag => tag.id)
              };

              const insertNewTag = await postgres.query(tagRelationshipQuery);

              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                done();

                resolve(insertNewItem.rows[0]);
              });
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
