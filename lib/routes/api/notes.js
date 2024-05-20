const router = require('express').Router()
const path = require('path')
const { readFile, writeFile } = require('fs/promises')
const randomId = require('../../utils/randomId')
const appDir = path.dirname(require.main.filename)

// get notes
router.get('/', (req, res) => {
    res.sendFile(path.join(appDir, "/lib/db/db.json"))
})

// create new note
router.put('/', async (req, res) => {
    // read db.json
    let notes = JSON.parse(await readFile(path.join(appDir, "/lib/db/db.json"), 'utf-8'))
    
    // generate id
    const newNoteId = randomId()

    // read note from request body
    const newNote = {
        id: newNoteId,
        ...req.body
    }

    // push the new note to the data variable
    notes.push(newNote)

    // save the db.json
    await writeFile(path.join(appDir, "/lib/db/db.json"), JSON.stringify(notes))

    // send response
    res.status(200).send(newNoteId)
})

// delete note
router.delete('/:id', async (req, res) => {
    // read db.json
    let notes = JSON.parse(await readFile(path.join(appDir, "/lib/db/db.json"), 'utf-8'))

    const filteredNotes = notes.filter((note) => note.id !== req.params.id)

    // save the db.json
    await writeFile(path.join(appDir, "/lib/db/db.json"), JSON.stringify(filteredNotes))

    // send response
    res.status(200).send()
})

module.exports = router