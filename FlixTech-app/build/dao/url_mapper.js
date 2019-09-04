"use strict";
// import { createConnection } from "typeorm";
// import { UrlMapper } from "./../model/url_mapper";
// import { AccountUser } from "../model/account_user";
// export class UrlMapperDao {
//     public async getConnection(urlMapper:UrlMapper) {
//         createConnection({
//             type: "postgres",
//             host: "localhost",
//             port: 5432,
//             username: "flixtech_user",
//             password: "1234flixtech",
//             database: "url_shortener",
//             entities: [
//                 __dirname + "/../model/*.ts"
//             ],
//             synchronize: false,
//             logging: false
//         }).then(async connection => {
//     let user = new AccountUser();
//     user.email_id = "Oracle Magazine";
//     user.password = "Oracle Magazine";
//     user.last_login = new Date();
//     user.created_on = new Date();
//     user.is_deleted = false;
//             let catalogRepository = connection.getRepository(AccountUser);
//             await catalogRepository.save(user);
//             console.log('Catalog has been saved' + '\n');
//         }).catch(error => console.log(error));
//     }
//     public async save(urlMapper: UrlMapper) {
//         await this.getConnection(urlMapper)
//         }
// }
