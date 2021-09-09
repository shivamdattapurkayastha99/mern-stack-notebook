const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured");
    }
})
router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('desc').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, desc, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, desc, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured");
    }


})
module.exports = router
