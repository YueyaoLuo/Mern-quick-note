const Note = require('../../models/note');

module.exports = {
    index,
    create: createNote,
   
}

async function index(req, res) {
    try {
        //find all notes by the user
        const notes = await Note.find({ user: req.user._id});
        notes.sort((a, b)=> b.createdAt - a.createdAt)
        //sort notes by created time in descending order
        // notes.createdAt.sort((a,b) => b-a)
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Note list shown fail' });
    }
}




async function createNote(req, res) {
    try {
      const newNote = new Note({
        text: req.body.text,
        user: req.user._id
      });
      // console.log("req.body is", req.body)
      // console.log(newNote)
      await newNote.save();
      res.status(201).json(newNote);
    } catch (err) {
      res.status(400).json({ message: 'Note creation failed' });
    }
  }