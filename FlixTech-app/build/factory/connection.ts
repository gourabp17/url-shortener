"use strict";
// import { ConnectionOptions } from 'typeorm';
// const config: ConnectionOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'flixtech_user',
//   password: '1234flixtech',
//   database: 'url_shrotner',
//   entities: [
//     __dirname + '/../**/*.entity{.ts,.js}',
//   ],
//   synchronize: true,
// };
// export default config;
import {createConnection} from "typeorm";
import {Catalog} from "./Catalog";
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "mysql",
  database: "mysql",
  entities: [
      __dirname + "/entity/*.ts"
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
 
let catalog = new Catalog();
  catalog.journal = "Oracle Magazine";
  catalog.publisher = "Oracle Publishing";
  catalog.edition = "November December 2013";
  catalog.title = "Quintessential and Collaborative";
  catalog.author = "Tom Haunert";
  catalog.isPublished = true;

  let catalogRepository = connection.getRepository(Catalog);

  await catalogRepository.save(catalog);
  console.log('Catalog has been saved'+'\n');
 
  let [all_Catalogs, CatalogsCount] = await catalogRepository.findAndCount();

  console.log('Catalogs count: ', CatalogsCount+'\n');

}).catch(error => console.log(error));