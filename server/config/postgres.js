const { Pool } = require('pg');



module.exports = (app) => {
  const host = app.get('PG_HOST');
  const user = app.get('PG_USER');
  const password = app.get('PG_PASSWORD');
  const database = app.get('PG_DB');
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */
  return new Pool({
       host, user, password, database, idleTimeoutMillis: 3000, connectionTimeoutMillis: 2000

    /**
     *  @TODO: Supply the correct configuration values to connect to postgres
     * 
     */
  });
};
