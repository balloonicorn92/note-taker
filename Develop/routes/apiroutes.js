const { INSPECT_MAX_BYTES } = require('buffer')
const fs = require('fs')
const db = require('../db/db.json')
const router = require('express').Router()


router.get('/notes', (req, res) => {
   let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    res.json(db)
})

router.post('/notes', (req, res) => {
    let noteModal = {id: Math.floor(Math.random() * 200), title: req.body.title, text: req.body.text} 
    db.push(noteModal)
    fs.writeFileSync('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
    })
    res.json(db)
})

router.delete('/notes/:id', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        const notes = JSON.parse(data)
        const updatedNotes = notes.filter(item => item.id !== parseInt(req.params.id))

        fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes), function (err, res) {
            if(err) throw err
        })
        res.json(updatedNotes)
    })
})

module.exports = router