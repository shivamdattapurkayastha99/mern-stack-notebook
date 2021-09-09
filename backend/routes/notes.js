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
router.put('/updatenote/:id', fetchUser, [
    


], async (req, res) => {
    const {title,desc,tag}=req.body
    const newNote={};
    if (title) {
        newNote.title=title

    }
    if (desc) {
        newNote.desc=desc

    }
    if (tag) {
        newNote.tag=tag

    }
    const note=Notes.findById(req.params.id)
    if (!note) {
        return res.status(404).send("not found")
    }
    if (note.user.toString()!==req.user.id) {
        return res.status(401).send("not allowed")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
});
module.exports = router
