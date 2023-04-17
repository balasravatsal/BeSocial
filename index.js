const express = require('express')
const path = require('path')
const con = require('./models/ngo')
const bodyParser = require('body-parser')
const methodeOverride = require('method-override')      // for using requests other than get and post
const ejsMate = require('ejs-mate')
const catchAsync = require('./views/utils/catchAsync')
const session = require('express-session')
const flash = require('connect-flash')
const ngoRoutes = require('./routes/ngos')
const feedbackRoutes = require('./routes/feedback')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userRoutes = require('./routes/users')
const MySQLStore = require('express-mysql-session')(session);

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodeOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


const sessionStore = new MySQLStore({
    expiration: 960000,
    createDatabaseTable: true,
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
    connectionLimit: 1,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, con);

app.use(session({
    secret: 'mysecret', // replace with your secret
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));


app.use(session(sessionStore))
app.use(flash())


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use((req, res, next) => {
    res.locals.currentUser = req.session.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.get('/', (req, res) => {
    res.render('home')
})


// ngo router
// feedback router

// Route handlers
app.use('/ngos', ngoRoutes)
app.use('/ngos/:id/feedbacks', feedbackRoutes)
app.use('/', userRoutes)

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'Oh No, Something went wrong!'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})



