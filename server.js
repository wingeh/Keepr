const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const uniqid = require('uniqid');

// Access

// req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public folder
app.use(express.static("public"));

// index.js
app.get('/assets/js/index.js'), function (req, res) {
  res.sendFile(path.join(__dirname, 'public/assets/js/index.js'))
};

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// View saved notes
app.get('/api/notes', (req, res) => {
  console.log('/api/notesget');
  let json = getJson();
  console.log(json);
  res.json(json);
})

function getJson() {
    let data = fs.readFileSync(__dirname + '/db/db.json');
    let json = JSON.parse(data);
    return json;
  };

// Save new notes
app.post('/api/notes', (req, res) => {
  console.log('/api/notespost');
  console.log(req.body);
  addNotes(req.body);
  res.json(getJson());
})

function addNotes(notes) {
    let json = getJson();
    let newNotes = notesTemplate(notes);
    json.push(newNotes);
    saveNotes(json);
  };

  function notesTemplate(data) {
    const uniqueID = uniqid();
    let obj = {
      title: data.title,
      text: data.text,
      id: uniqueID,
    }
    return obj;
  };

// Delete saved notes
app.delete('/api/notes/:id', (req, res) => {
  let notes = getJson();
  let newNotes = notes.filter((rmvNotes) => rmvNotes.id !== parseInt(req.params.id));
  saveNotes(newNotes);
  res.json(newNotes);
});

function saveNotes(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(__dirname + '/db/db.json', data);
  };

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));