// NPM Packages included
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//The Port the server is going to run on
const PORT = process.env.PORT || 3001;

// Create an app variable and set it to express to initialize the server
const app = express();

// Sets up the middleware
// Targets using the public folder content
app.use(express.static('public'));
// Takes in the users inputed data from any HTTP request and JSON parses it
app.use(express.json());





// GET Route for the "/" homepage, when the "Get Started" button is clicked it will take you to the "/notes" page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// GET Route for when Note Taker is clicked, it takes you back to the "/" home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// GET Route to retrieve the notes data in db.json file
app.get('/api/notes', (req, res) => {
  const noteData = './db/db.json';
  fs.readFile(noteData, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});


// Create an app.post route for users to add new notes to the db.json file
app.post('/api/notes', (req, res) => {
  // Stores the user's inputed req into the title and text
  const { title, text } = req.body;
  // Stores the directory location of note's data base json file into a const variable as a string
  const noteData = './db/db.json';

  // Read the noteData from db.json file to make sure we get the current one
  fs.readFile(noteData, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }

    // Store the current noteData into a const var
    const currentNotes = JSON.parse(data);

    // Create a const variable to store the newNote in
    const newNote = {
      title,
      text,
      // Using the NPM package for ids
      id: uuidv4(),
    };

    // Gets a copy of the currentNotes, and combines it with the newNote, creating a new Array called updatedNotes
    const updatedNotes = [...currentNotes, newNote];

    // With the updatedNotes we writeFile to the noteData file, JSON.stringifying the updatedNotes
    fs.writeFile(noteData, JSON.stringify(updatedNotes), 'utf8', (err) => {
      // If there is an error, return the error.
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      } else {
        // If it successfully writes return the updatedNotes
        console.log('Notes successfully Added!')
        return res.json(updatedNotes);
      }
    });
  });
});



// Create a app.delete route for the User to DELETES notes from the db.json file
app.delete('/api/notes/:id', (req, res) => {
  // Stores the id parameter from the request
  const deleteId = req.params.id;
  // Stores the directory location of note's data base json file into a const variable as a string
  const noteData = './db/db.json';

  // Read the noteData from db.json file to make sure we get the current one
  fs.readFile(noteData, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    };

    // Store the current noteData into a const var
    const currentNotes = JSON.parse(data);

    // Filters the currentNotes
    const updatedNotes = currentNotes.filter((eachNote) => eachNote.id !== deleteId);

    // With the updatedNotes we writeFile to the noteData file, JSON.stringifying the updatedNotes
    fs.writeFile(noteData, JSON.stringify(updatedNotes), "utf8", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      } else {
        console.log(`Note with id ${deleteId} successfully deleted`);
        return res.json(updatedNotes);
      }
    });
  });
});

// Sets up our server to listen for http requests
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);