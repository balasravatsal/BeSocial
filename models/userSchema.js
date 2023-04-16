const con = require('./ngo')

// to  create feedback schema of NGOs
// used during seeding or initially

const makeFeedbackSchema = async() => {
    const createUserSchema = `
        CREATE TABLE userSchema (
            userID char(36) primary key,
            email varchar(60)
        )`
    await con.query(createFeedbackSchema, (error, result) => {
        if (error) throw error
        else console.log(result);
    })
}

makeFeedbackSchema()
