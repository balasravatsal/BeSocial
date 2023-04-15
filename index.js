const express = require('express')
const path = require('path')
const con = require('./models/ngo')
const bodyParser = require('body-parser')
const methodeOverride = require('method-override')      // for using requests other than get and post
const ejsMate = require('ejs-mate')
const catchAsync = require('./views/utils/catchAsync')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodeOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))





app.get('/', (req, res) => {
    res.render('home')
})


app.get('/ngos', catchAsync(async (req, res) => {

    const sql = `SELECT * FROM ngoSchema`
    await con.query(sql, (error, result) => {
        if (error) console.log('\n\n\n\n\nERROR!!!!\n\n\n\n\n' + error)
        res.render('ngos/index', {ngos: result})
    })
}))

app.get('/ngos/new', (req, res) => {
    res.render('ngos/new')
})

app.post('/ngos', catchAsync(async (req, res) => {
    if (!req.body.title) throw new ExpressError('Invalid NGO data', 400)
    const title = req.body.title
    const description = req.body.description
    const location = req.body.location

    const queryAdd = `insert into ngoSchema (id, title, description, location) values (UUID(), ?, ?, ?)`
    await con.query(queryAdd, [title, description, location], (error, result) => {
        if (error) console.log('\n\n\n\n\nERROR!!!!\n\n\n\n\n' + error)
        res.redirect('/ngos')
    })

}))

app.get('/ngos/:id', catchAsync(async (req, res) => {
    const ngoID = await req.params.id
    const queryShow = `SELECT * from ngoSchema where id = ?`
    const queryFeedback = `SELECT * from feedbackSchema where ngoid = ?`

    await con.query(queryShow, [ngoID], (error, nResult) => {
        if (error) {
            return res.status(500).send(error);
        }
        con.query(queryFeedback, [ngoID], (error, fResult) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.render('ngos/show', {ngo: nResult[0], feedback: fResult})
        })
    })
}))

app.get('/ngos/:id/edit', catchAsync(async (req, res) => {
    const id = req.params.id
    const queryShow = `SELECT * from ngoSchema where id = ?`

    await con.query(queryShow, [id], (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }
        res.render('ngos/edit', {ngo: result[0]})
    })
}))

app.post('/ngos/:id', catchAsync(async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const description = req.body.description
    const location = req.body.location
    // console.log(req.body)
    const queryUpdate = `UPDATE ngoSchema set title = ?, description = ?, location = ? where id = ?`
    await con.query(queryUpdate, [title, description, location, id], (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }
        res.redirect(`/ngos/${id}`)
    })
}))



app.delete('/ngos/:id', catchAsync(async (req, res) => {
    const id = req.params.id
    const queryDelete = `DELETE FROM ngoSchema WHERE id = ?`
    const queryDeleteFeedback = `DELETE FROM feedbackSchema WHERE ngoID = ?`

    await con.query(queryDeleteFeedback, [id], (error, result) => {
        if (error) console.log('\n\n\n\n\nERROR!!!!\n' + error)
        con.query(queryDelete, [id], (error, result) => {
            res.redirect('/ngos')
        })
    })
}))

app.post('/ngos/:id/feedbacks', catchAsync(async (req, res) => {
    // res.send('HELL YES')
    const id = req.params.id
    const rating = req.body.rating
    const body = req.body.body

    const queryFeedback = `insert into feedbackSchema () values (UUID(), ?, ?, ?)`
    await con.query(queryFeedback, [body, rating, id], (error, result) => {
        if (error) console.log('\n\n\n\n\nERROR!!!!\n\n\n\n\n' + error)
    })
    res.redirect(`/ngos/${id}`)

}))

app.delete('/ngos/:id/feedbacks/:feedbackID', catchAsync(async (req, res) => {
    const id = req.params.id
    const feedbackID = req.params.feedbackID
    const queryDeleteFeedback = `DELETE FROM feedbackSchema WHERE feedbackID = ?`

    await con.query(queryDeleteFeedback, [feedbackID], (error, result) => {
        if (error) console.log('\n\n\n\n\nERROR!!!!\n\n\n\n\n' + error)
    })
    res.redirect(`/ngos/${id}`)
}))

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'Oh No, Something went wrong!'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})



