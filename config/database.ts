import { Sequelize } from "sequelize";
import { CONFIG } from "./environment";

// export const sequelize  = new Sequelize(
//   'postgresql://tt_owner:MEF2Rk7AhPdj@ep-lingering-snowflake-a5popb2a.us-east-2.aws.neon.tech/a',
//   {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // Allow self-signed certificates
//       },
//     },
//   }
// );


export const sequelize = new Sequelize(
    CONFIG.DB_NAME,
    CONFIG.DB_USERNAME,
    CONFIG.DB_PASSWORD,
    {
        host: CONFIG.DB_HOST,
        dialect: "postgres",
        logging: false
    })

export const connectToDatabase = () => {
  sequelize
    .authenticate()
    .then(() => {
      sequelize.sync({ alter: true }); // This will create table in db if not exists
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};
