// NPM Packages included
const express = require('express');
const path = require('path');
const fs = require('fs');

//The Port the server is going to run on
const PORT = 3001;

// Create an app variable and set it to express to initialize the server
const app = express();

// Sets up the middleware
app.use(express.static('public'));

// Sets up our server to listen for http requests
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

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
  const noteData = require('./db/db.json');
  res.json(noteData);
});
