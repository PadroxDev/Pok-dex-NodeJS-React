const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

dbo.connectToServer();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

/* POKEMONS */

app.get("/pokemon/list", function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
      .collection("pokemon")
      .find({})
      // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemon!");
        } else {
          res.json(result);
        }
      });
  });

  app.post('/pokemon/insert', jsonParser, (req, res) => {
    const body = req.body;
    console.log('Got body:', body);
    const dbConnect = dbo.getDb();

    dbConnect
      .collection("pokemon")
      .insertOne({ ...body })
    res.json(body);
});

app.post('/pokemon/update', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("pokemon")
    .updateOne( { name:body.name }, { $set: { ...body.updated }}, { upsert: true });

  res.json(body);
});

app.delete('/pokemon/delete_by_name', jsonParser, (req, res) => {
  const body = req.body; // Filter
  console.log('Got body', body);
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("pokemon")
    .deleteOne( { name:body.name });

  res.json(body);
});

/* POKEDEX */

app.get("/pokedex/list", function (req, res) {
  const dbConnect = db.getDb();
  
  dbConnect
  .collection("pokedex")
  .find({})
  // permet de filtrer les résultats
  /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
  .toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching pokemon!");
    } else {
      res.json(result);
    }
  });
});

app.post('/pokedex/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("pokemon")
    .insertOne({ ...body })
  res.json(body);
});

app.post('/pokemon/update', jsonParser, (req, res) => {
const body = req.body;
console.log('Got body:', body);
const dbConnect = dbo.getDb();

dbConnect
  .collection("pokemon")
  .updateOne( { name:body.name }, { $set: { ...body.updated }}, { upsert: true });

res.json(body);
});

app.delete('/pokemon/delete_by_name', jsonParser, (req, res) => {
const body = req.body; // Filter
console.log('Got body', body);
const dbConnect = dbo.getDb();

dbConnect
  .collection("pokemon")
  .deleteOne( { name:body.name });

res.json(body);
});