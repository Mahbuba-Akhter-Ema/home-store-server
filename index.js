const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const app = express();

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.trknobu.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// Data Collection MongoDB
async function run() {
    try {
        const Bedroom = client.db('HomeStore').collection('Bedroom');
        const livingRoomCollection = client.db('HomeStore').collection('livingRoom');
        const dinningRoomCollection = client.db('HomeStore').collection('dinningRoom');
        const addProductCollection = client.db('HomeStore').collection('addProduct')
        const sellerCollection = client.db('HomeStore').collection('Seller')
        const buyerCollection = client.db('HomeStore').collection('Buyer')
        const bookingCollection = client.db('HomeStore').collection('booking')
        const reportCollection = client.db('HomeStore').collection('report')


        // bedroom 
        app.get('/bedRoom', async (req, res) => {
            const query = {};
            const bedRoomResults = await Bedroom.find(query).toArray();
            res.send(bedRoomResults);
        })

        // livingRoom 
        app.get('/livingRoom', async (req, res) => {
            const query = {};
            const livingRoomResults = await livingRoomCollection.find(query).toArray();
            res.send(livingRoomResults);
        })

        // dinningRoom 
        app.get('/dinningRoom', async (req, res) => {
            const query = {};
            const dinningRoomResults = await dinningRoomCollection.find(query).toArray();
            res.send(dinningRoomResults);
        })

        // get seller 
        app.get('/allSeller', async (req, res) => {
            const query = {};
            const result = await sellerCollection.find(query).toArray();
            res.send(result)
        })

        // get Buyer 
        app.get('/allBuyer', async (req, res) => {
            const query = {};
            const result = await buyerCollection.find(query).toArray();
            res.send(result)
        })

        // getReport 
        app.get('/allReport', async (req, res) => {
            const query = {};
            const result = await reportCollection.find(query).toArray();
            res.send(result)
        })

        app.post('/position', async (req, res) => {
            const user = req.body;
            console.log(user);
            if (user.select === "Buyer") {
                const result = await buyerCollection.insertOne(user)
                return res.send(result)
            }

            if (user.select === "Seller") {
                const result = await sellerCollection.insertOne(user)
                return res.send(result)
            }

            const result = await buyerCollection.insertOne(user)
            res.send(result)

        })

        // add Product
        app.post('/products', async (req, res) => {
            const user = req.body;
            if (user.brand === "BedRoom") {
                const result = await Bedroom.insertOne(user)
                return res.send(result)
            }
            if (user.brand === "DinningRoom") {
                const result = await dinningRoomCollection.insertOne(user)
                return res.send(result)
            }
            if (user.brand === "LivingRoom") {
                const result = await livingRoomCollection.insertOne(user)
                return res.send(result)
            }
        })
        // to post booking  
        app.post('/booking', async (req, res) => {
            const user = req.body;
            const booking = await bookingCollection.insertOne(user)
            res.send(booking)
        })

        app.get('/booking', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const bookingData = await bookingCollection.find(query).toArray();
            res.send(bookingData);
        })

        // my orders
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email}
            const bedRoomData = await Bedroom.find(query).toArray();
            const dinningRoomData = await dinningRoomCollection.find(query).toArray();
            const livingRoomData = await livingRoomCollection.find(query).toArray();
            res.send(bedRoomData&&dinningRoomData&&livingRoomData)
        })

        // report 
        app.post('/report', async (req, res) => {
            const reportData = req.body;
            const report = await reportCollection.insertOne(reportData)
            res.send(report)
        })

        // Delete seller 
        app.delete('/sellerDelete/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const deleteData = await sellerCollection.deleteOne(query)
            res.send(deleteData)
        })

        // Delete Buyer
        app.delete('/buyerDelete/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const deleteData = await buyerCollection.deleteOne(query)
            res.send(deleteData)
        })

        // delete Report 
        app.delete('/allReport/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const deleteData = await reportCollection.deleteOne(query)
            res.send(deleteData)
        })

    }
    finally {

    }
}

run().catch(error => {
    console.log(error);
});



app.get('/', async (req, res) => {
    res.send('Home store is running on server')
});

app.listen(port, () => console.log(`Home store is listening server ${port}`));