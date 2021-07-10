const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 3000;
const db = require('./db/db.json');
const { dirname } = require('node:path');

// Access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(ecpress.json());


// Access to public folder
app.use(express.static(path.join(_dirname, '/public')));


// Index.js
app.get('/assets/js/index.js'), function (req, res) {
  res.sendFile(path.join(_dirname, 'public/assets/js/index.js'))
};

// Index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(_dirnmae, 'public/index.html'))
});

// Notes.html
app.get('/notes', function (req, res) {
  res.sendFile(path.join(_dirname, 'public/notes.html'))
});

app.get('api/notes', (req, res) => {
  console.log('/api/notesget');
  let json = getJson();
  console.log(json);
  res.json(json);
})

app.post('api/notes', (req, res) => {
  console.log('/api/notespost');
  console.log(req.body);
  res.json(getJson());
})


// Listener
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));