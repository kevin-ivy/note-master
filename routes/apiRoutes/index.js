const router = require('express').Router();
const notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

router.get("/notes", (req, res) => {
    let results = notes;
    return res.json(results);
});

router.post("/notes", (req,res) => {
    const newNote = req.body;

    req.body.id = notes.length.toString();

    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    res.redirect(req.originalUrl)
});

router.delete("/api/notes/:id", (req, res) => {
    
});

module.exports = router;