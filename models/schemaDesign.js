const con = require('./ngo')

// to  create  tables
// used initially

const makeFeedbackSchema = async() => {
    const createFeedbackSchema = `
        CREATE TABLE feedbackSchema (
            feedbackID char(36) primary key,
            body varchar(500),
            rating int,
            ngoID char(36),
            author varchar(60)
            help bool default 0,
            FOREIGN KEY (ngoID) REFERENCES ngoSchema(id)
        )`
    await con.query(createFeedbackSchema, (error, result) => {
        if (error) throw error
        else console.log(result);
    })
}


const makeUserSchema = async() => {
    const createUserSchema = `
        CREATE TABLE userSchema (
            userID char(36) primary key,
            username varchar(50),
            password varchar (225)
            ngoID char(36),
            email varchar(60)
        )`
    await con.query(createUserSchema, (error, result) => {
        if (error) throw error
        else console.log(result);
    })
}

const makeNgoSchema = async() => {
    const createNgoSchema = `
        CREATE TABLE ngoSchema (
            id char(36) primary key,
            title varchar(50),
            description varchar (500)
            location varchar(50),
            userID char(36),
            FOREIGN KEY (ngoID) REFERENCES userSchema(userID)
        )`
    await con.query(createNgoSchema, (error, result) => {
        if (error) throw error
        else console.log(result);
    })
}

const makeNeedypeopleSchema = async() => {
    const createneedypeopleSchema = `
        CREATE TABLE ngoSchema (
            needyUserID char(36) primary key,
            needyUsername varchar(50),
            password varchar (100),
            email varchar(60)
        )`
    await con.query(createneedypeopleSchema, (error, result) => {
        if (error) throw error
        else console.log(result);
    })
}

makeFeedbackSchema()
makeUserSchema()
makeNgoSchema()
makeNeedypeopleSchema()



