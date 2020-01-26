const express = require('express')
const app = express()
const mongoose = require('mongoose')

// TODO: Use correct path for DB
mongoose.connect('mongodb+srv://adam:adam@hackatbrown-jtc8a.gcp.mongodb.net/test?retryWrites=true&w=majority', 
{useNewUrlParser: true});

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// Routes
const landingRouter = require('./routes/landing')

app.use('/', landingRouter)

// Choose port
app.listen(3000, () => console.log('Listening on port 3000'))