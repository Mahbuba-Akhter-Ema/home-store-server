const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.trknobu.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// Data Collection MongoDB
async function run (){
    try{
        const Bedroom = client.db('HomeStore').collection('Bedroom');
        const livingRoomCollection = client.db('HomeStore').collection('livingRoom');
        const dinningRoomCollection = client.db('HomeStore').collection('dinningRoom');
        const addProductCollection = client.db('HomeStore').collection('addProduct')
        const sellerCollection = client.db('HomeStore').collection('Seller')
        const buyerCollection = client.db('HomeStore').collection('Buyer')

        // bedroom 
        app.get('/bedRoom', async(req, res) => {
            const query = {};
            const bedRoomResults = await Bedroom.find(query).toArray();
            res.send(bedRoomResults);
        })

        // livingRoom 
        app.get('/livingRoom', async(req, res) => {
            const query = {};
            const livingRoomResults = await livingRoomCollection.find(query).toArray();
            res.send(livingRoomResults);
        })

         // dinningRoom 
         app.get('/dinningRoom', async(req, res) => {
            const query = {};
            const dinningRoomResults = await dinningRoomCollection.find(query).toArray();
            res.send(dinningRoomResults);
        }) 

        app.post('/position', async (req, res) => {
            const user = req.body;

            if (user.position === "Buyer") {
                const result = await buyerCollection.insertOne(user)
                return res.send(result)
            }

            if (user.position === "Seller") {
                const result = await sellerCollection.insertOne(user)
                return res.send(result)
            }

            const result = await buyerCollection.insertOne(user)
            res.send(result)

        })
               
    }
    finally{

    }
}

run().catch(error =>{
    console.log(error);
});



app.get('/', async (req, res) => {
    res.send('Home store is running on server')
});

app.listen(port, () => console.log(`Home store is listening server ${port}`));