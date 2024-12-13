require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * @see https://github.com/sequelize/umzug/tree/main#cli
 */
require("./infra/umzug").migrator.runAsCLI();
