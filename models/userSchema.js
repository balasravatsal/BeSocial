// ******* Dont run **********



// const con = require('./ngo')
//
// // to  create feedback schema of NGOs
// // used during seeding or initially
//
// const makeUserSchema = async() => {
//     const createUserSchema = `
// CREATE TABLE userSchema (
// userID char(36) not null primary key,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL
// );
//         )`
//     await con.query(createUserSchema, (error, result) => {
//         if (error) throw error
//         else console.log(result);
//     })
// }
//
// makeUserSchema()
