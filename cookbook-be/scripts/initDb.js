// import {pool} from '../db.js';

// createRecipeTable();

// async function createRecipeTable() {
//     try {
//         const res = await pool.query(`
//         CREATE TABLE recipes (
//             recipe_id serial primary key,
//             type_of_food int,
//             image varchar(255),
//             info varchar(255),
//             ingredients varchar(255),
//             directions varchar(255)
//         );`);
//         console.log('table created', res);
//     } catch (error) {
//         console.log(error);
//     }
// }