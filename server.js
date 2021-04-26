const express = require('express')
const { notes } = require('./Develop/db/db.json')
const app = express()

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.listen(3001, () => {
    console.log('API server now on port 3001')
})