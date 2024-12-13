const Sequelize = require("sequelize");

/**
 * @type {Sequelize.Sequelize}
 */
let _sequelize;

module.exports.connectToMySqlServer = async () => {
  await this.db().authenticate();

  const url = await getSecretValue(process.env.DB_URL_SECRET_NAME);
  const username = await getSecretValue(process.env.DB_USERNAME_SECRET_NAME);
  console.log(`Connected to MySQL server at:   \`${username}\`@\`${url}\``);
};

module.exports.db = async () => {
  if (!_sequelize) {
    /**
     * @see https://sequelize.org/api/v6/class/src/sequelize.js~sequelize
     */
    if (process.env.DB_CONNECTION_STRING_SECRET_NAME) {
      const connectionString = await getSecretValue(
        process.env.DB_CONNECTION_STRING_SECRET_NAME
      );
      _sequelize = new Sequelize(connectionString, {
        define: {
          //prevent sequelize from pluralizing table names
          freezeTableName: true,
        },
      });
    } else {
      const url = await getSecretValue(process.env.DB_URL_SECRET_NAME);
      const port = await getSecretValue(process.env.DB_PORT_SECRET_NAME);
      const database = await getSecretValue(process.env.DB_NAME_SECRET_NAME);
      const username = await getSecretValue(
        process.env.DB_USERNAME_SECRET_NAME
      );
      const password = await getSecretValue(
        process.env.DB_PASSWORD_SECRET_NAME
      );
      _sequelize = new Sequelize(database, username, password, {
        host: url,
        port: port,
        dialect: "mysql",
        logging: console.log,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
    }
    console.log("Successfully initialize sequelize.");
  }
  return _sequelize;
};
