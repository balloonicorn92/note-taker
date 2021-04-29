const express = require('express')
const viewroutes = require('./routes/htmlroutes')
const apiroutes = require('./routes/apiroutes')
const app = express()

//converts data to key/value pairings that can accessed in the req.body object
//extended:true informs server that there may be sub-array data nested in it, look deep into the POST data as possible
app.use(express.urlencoded({ extended: true }))
//takes incoming POST data in form of json and parses into req.body
app.use(express.json())
app.use(express.static('public'))
app.use('/api', apiroutes)
app.use('/', viewroutes)



app.listen(3001, () => {
    console.log('API server now on port 3001')
})