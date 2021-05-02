const fs = require('fs')
const db = require('../db/db.json')
const router = require('express').Router()
const { v1: uuidv1 } = require('uuid')

router.get('/notes', (req, res) => {
   let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    res.json(data)
})

router.delete('/notes/:id', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        const notes = JSON.parse(data)
        const updatedNotes = notes.filter(item => item.id !== req.params.id)
        fs.writeFile("./db/db.json", JSON.stringify(updatedNotes), function (err, res) {
            if(err) throw err
        })
        res.json(updatedNotes)
    })
})

router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
    const db = JSON.parse(data)
    console.log(db)
    let noteModal = {id: uuidv1(), title: req.body.title, text: req.body.text} 
    db.push(noteModal)
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
    })
    res.json(db)
  })
})

module.exports = router