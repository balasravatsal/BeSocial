const express = require('express')
const path = require('path')
const con = require('./models/ngo')
const bodyParser = require('body-parser')
const methodeOverride = require('method-override')      // for using requests other than get and post
const ejsMate = require('ejs-mate')
const catchAsync = require('./views/utils/catchAsync')
const session = require('express-session')
const flash = require('connect-flash')
const ngos = require('./routes/ngos')
const feedback = require('./routes/feedback')
const passport = require('passport')
const LocalStrategy = require('passport-local')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodeOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))



const sessionConfig = {
    secret: 'make better secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())


////////////////////////////////////////////////////////////////////////




app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use((req, res, next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


// ROute handlers
app.use('/ngos', ngos)
app.use('/ngos/:id/feedbacks', feedback)

app.get('/', (req, res) => {
    res.render('home')
})


// ngo router
// feedback router

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'Oh No, Something went wrong!'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})



