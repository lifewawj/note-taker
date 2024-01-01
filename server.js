// NPM Packages included
const express = require('express');
const path = require('path');

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

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);