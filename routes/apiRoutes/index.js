const router = require('express').Router();
const notes = require('../../db/db.json');

router.get("/notes", (req, res) => {
    let results = notes;
    return res.json(results);
});

router.post("/notes", (req,res) => {
    const newNote = req.body;
    req.body.id = notes.length.toString();

    notes.push(newNote);
    res.json(newNote);
});

module.exports = router;