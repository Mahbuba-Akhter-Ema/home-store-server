const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

// midleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER};:${process.env.DB_PASSWORD}@cluster0.trknobu.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// BedRoom Data Collection MongoDB
async function run (){
    try{
        const bedroomCollection = client.db('HomeStore').collection('Bedroom');

        app.get('/bedroom', async(req, res) => {
            const query = {};
            const results = await bedroomCollection.find(query).toArray();
            res.send(results);
        })
    }
    finally{

    }
}

run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Home store is running on server')
});

app.listen(port, () => console.log(`Home store is listening server ${port}`));