const router = require('express').Router();
const notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

router.get("/notes", (req, res) => {
    let results = notes;
    return res.json(results);
});

router.get("/notes/:id", (req, res) => {
    const result = req.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (result === notes[i].id) {
          return res.json(notes[i]);
        }
      }
    
      return res.json(false);
})

router.post("/notes", (req,res) => {
    //Create a note using request body
    const newNote = req.body;

    //Add an id based on number of saved notes
    req.body.id = notes.length.toString();

    //Add new note to the array
    notes.push(newNote);

    //Update db file
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    //reload page to display saved notes
    res.redirect(req.originalUrl)
});

router.delete('/notes/:id', (req, res) => {
        // read noteData from json file
        noteData = fs.readFileSync(
            path.join(__dirname, '../../db/db.json'));
        // parse data to get array of objects
        noteData = JSON.parse(noteData);
        // delete old note from array of note objects
        noteData = noteData.filter(function(note) {
            return note.id != req.params.id;
        });

        //write new notes to the file
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify(noteData, null, 2));

        //reload page to display saved notes
        res.sendStatus(204)
});

module.exports = router;