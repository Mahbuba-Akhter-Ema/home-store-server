const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

// midleware 
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://<username>:<password>@cluster0.trknobu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', async (req, res) => {
    res.send('Home store is running on server')
});

app.listen(port, () => console.log(`Home store is listening server ${port}`));