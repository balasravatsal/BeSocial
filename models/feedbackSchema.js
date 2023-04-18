// ******* Dont run **********




// const con = require('./ngo')
//
// // to  create feedback schema of NGOs
// // used during seeding or initially
//
// const makeFeedbackSchema = async() => {
//     const createFeedbackSchema = `
//         CREATE TABLE feedbackSchema (
//             feedbackID char(36) primary key,
//             body varchar(500),
//             rating int,
//             ngoID char(36),
//             FOREIGN KEY (ngoID) REFERENCES ngoSchema(id)
//         )`
//     await con.query(createFeedbackSchema, (error, result) => {
//         if (error) throw error
//         else console.log(result);
//     })
// }
//
// makeFeedbackSchema()
