// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(bodyParser.json()) //for json bodies

const port = 1000; // Specify the port number where the server will run
// Note: Change port if it's already in use. Users will access endpoints like:
// Sample: http://localhost:1100/get
// General: http://localhost:portnumber/endpoint

// MongoDB connection
const uri = 'mongodb://localhost:27017'; // MongoDB connection string, default port is 27017
const client = new MongoClient(uri); // Create a new MongoDB client instance

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect(); // Attempt to connect to MongoDB using the client instance
        console.log('Connected to MongoDB'); // Log success message if connection is successful
    } catch (err) {
        console.error('Failed to connect to MongoDB', err); // Log error message if connection fails
        process.exit(1); // Exit the Node.js process with a non-zero status code (1 indicates an error)
    }
}

connectToMongoDB(); // Call the async function to initiate the connection to MongoDB

const database = client.db('playerDB'); // Select the database 'playerDB' from the connected MongoDB instance
const collection = database.collection('playerCollection'); // Select the collection 'playerCollection' from the 'playerDB' database


// Create Data (ADD)
app.post('/post', async (req, res) => {
    try {
        const newItem = req.body;
        const result = await collection.insertOne(newItem);
        res.status(201).send({ insertedId: result.insertedId });
    } catch (err) {
        console.error('Failed to add item', err);
        res.status(500).send({ error: `Failed to create item: ${err.message}` });
    }
});

// Read Data (FETCH)
app.get('/get', async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.send(data);
    } catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).send({ error: 'Failed to fetch data' });
    }
});


// Update Data (UPDATE)
app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }
        const updatedItem = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedItem }
        );
        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'Player not found' });
        }
        res.send({ message: 'Player updated' });
    } catch (err) {
        console.error('Failed to update player', err);
        res.status(500).send({ error: `Failed to update player: ${err.message}` });
    }
});

// Delete Data (DELETE)
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Deleting player with id: ${id}`); // Log the id being deleted
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Player not found' });
        }
        res.send({ message: 'Player deleted' });
    } catch (err) {
        console.error('Failed to delete player', err);
        res.status(500).send({ error: `Failed to delete player: ${err.message}` });
    }
});

// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Server running on ${port}`)
);

// //Example:
// db.playerCollection.insertOne({ name: 'Neymar Jr', position: 'LW', number: 10 })
// db.playerCollection.insertOne({ name: 'Lionel Messi', position: 'RW', number: 10 })
// db.playerCollection.insertOne({ name: 'Cristiano Ronaldo', position: 'ST', number: 7 })
// db.playerCollection.insertOne({ name: 'Sergio Ramos', position: 'CB', number: 4 })
// db.playerCollection.insertOne({ name: 'Toni Kross', position: 'CM', number: 8 })


//MongoDB Commands
// mongod
// mongosh
// use playerDB 
// i named my database name as playerDB you can name it whataver you want

// db.createCollection('playerCollection')
// same as before you can name it as per your choice

// db.playerCollection.find()