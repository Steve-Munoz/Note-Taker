// declaring and defining variables/packages

var fs = require("fs");
// We need to include the path package to get the correct file path for our html
var path = require("path");
// Creating variable to hold db.json path
const db = path.resolve(__dirname, "../db");
// creating ID for db.json arrary
var idCounter = 1;

module.exports = function (app) {
  // API GET request for the notes in db.json file
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.resolve(db, "db.json"), "utf8", function (err, data) {
      // responding with object data from db.json
      res.json(JSON.parse(data));
    });
  });
  // API POST request for the notes in db.json file
  app.post("/api/notes", function (req, res) {
    // declaring and defining an empty array
    let notesObject = [];

    //read the notes from db.json
    let data = fs.readFileSync(path.resolve(db, "db.json"), "utf8");
    notesObject = JSON.parse(data);

    let newNoteObject = {
      id: idCounter,
      title: req.body.title,
      text: req.body.text,
    };
    // Appending new note to the notesObject variable
    notesObject.push(newNoteObject);
    // Used to add the new notes to db.json file
    fs.writeFileSync(
      path.resolve(db, "db.json"),
      JSON.stringify(notesObject),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    // responding with the new note to the client
    res.json(newNoteObject);
    idCounter += 1;
  });
  // delete requests
  app.delete("/api/notes/:id", function (req, res) {
    let notesObject = [];

    // Used to read the notes from db.json
    let data = fs.readFileSync(path.resolve(db, "db.json"), "utf8");
    notesObject = JSON.parse(data);

    let noteIndex = 0;
    // query parameter containing the id of a note to delete
    for (var i = 0; i < notesObject.length; i++) {
      if (notesObject[i].id === parseInt(req.params.id)) {
        noteIndex = i;
        break;
      }
    }

    notesObject.splice(noteIndex, 1);

    fs.writeFileSync(
      path.resolve(db, "db.json"),
      JSON.stringify(notesObject),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    res.json(true);
  });
};
