const con = require('./ngo')

// to  create feedback schema of NGOs
// used during seeding or initially

const makeNeedySchema = async() => {
    const createUserSchema = `CREATE TABLE needySchema ( needyID char(36) not null primary key, needyUsername VARCHAR(50) NOT NULL, Password VARCHAR(255) NOT NULL);`
    await con.query(createUserSchema, (error, result) => {
        if (error) throw error
        else console.log(result);
    })
}

makeNeedySchema()
