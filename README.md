Beginner's Guide to Building a RESTful API with Node.js, Express, and MongoDB
Introduction:
This contains a beginner-friendly guide and implementation of a RESTful API built with Node.js, 
Express, and MongoDB. The API allows you to manage data, including creating, reading, 
updating, and deleting records.
JavaScript: JavaScript is a versatile programming language primarily used for web 
development. It enables interactive web pages and is essential for building dynamic and 
responsive web applications.
Node.js: Node.js is a runtime environment that allows you to run JavaScript code outside of a 
web browser. It uses an event-driven, non-blocking I/O model, making it lightweight and 
efficient for building scalable network applications.
Express.js: Express.js is a minimal and flexible Node.js web application framework that 
provides a robust set of features for building web and mobile applications. It simplifies the 
process of creating APIs and handling HTTP requests.
MongoDB: MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It 
is designed for scalability, high availability, and performance, and it facilitates rapid 
development and iteration of database schemas.
RESTful API: RESTful API (Representational State Transfer) is an architectural style for 
designing networked applications. It uses standard HTTP methods (GET, POST, PUT, DELETE) to 
perform CRUD (Create, Read, Update, Delete) operations on resources. RESTful APIs are widely 
used for building web services and interacting with data-driven applications.
Prerequisites
• Basic knowledge of JavaScript, Node.js, and MongoDB
• Installed software: Node.js , MongoDB , Postman ( click the text for download )
• IDE: Visual Studio ( as per your choice )
Setup:
• Setting up the project directory
• Initializing npm and installing dependencies, open Terminal:
npm init -y
npm install express cors mongodb
• Creating the project structure
Make sure your “package.json” should look like this:
"dependencies": {
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"express": "^4.19.2",
"mongodb": "^6.8.0"
}
• Create a file named “index.js”
• Creating the Express Server
• Setting up the server
• Middleware configuration (CORS)
• Starting the server and listening on a port
// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
app.use(cors());
app.use(bodyParser.json())
// Specify the port number where the server will run
const port = 1100;
// Note: Change port if it's already in use. Users will access 
endpoints like:
// Sample: http://localhost:1100/get
// General: http://localhost:portnumber/endpoint
// Start the server and listen on the specified port
app.listen(port, () =>
console.log(`Server running on ${port}`)
);
• Database creation in MongoDB
On the Command Prompt or any terminal add these commands:
mongod
mongosh
For creating new database and collection in MongoDB:
use playerDB //i named my database name as playerDB you can name it 
whatever you want
Now you have to create a collection in this database:
db.createCollection('playerCollection') // name it as per your choice
Now you can add data in your collection database:
db.playerCollection.insertOne({ name: 'Neymar Jr', position: 'LW',
number: 10 })
db.playerCollection.insertOne({ name: 'Lionel Messi', position: 'RW',
number: 10 })
db.playerCollection.insertOne({ name: 'Cristiano Ronaldo', position:
'ST', number: 7 })
For showing all data from database by CMD:
db.playerCollection.find()
• Connecting to MongoDB:
// index.js
const uri = 'mongodb://localhost:27017'; //default port is 27017
const client = new MongoClient(uri);
// Connect to MongoDB
async function connectToMongoDB() {
try {
await client.connect();
console.log('Connected to MongoDB');
} catch (err) {
console.error('Failed to connect to MongoDB', err);
process.exit(1);
}
}
connectToMongoDB();
const database = client.db('playerDB'); // Select the database 
const collection = database.collection('playerCollection');
API Endpoints
Create Data (ADD)
Endpoint: /post
Method: POST
Adds a new data to the database:
// index.js
// Create Data (ADD)
app.post('/post', async (req, res) => {
try {
const newItem = req.body;
const result = await collection.insertOne(newItem);
res.status(201).send({ insertedId: result.insertedId });
} catch (err) {
console.error('Failed to add item', err);
res.status(500).send({ error: `Failed to create item: 
${err.message}` });
}
});
Example request:
In body section select ‘raw’ ‘JSON’
put this on input field ( JSON type)
Example Response:
Read Data (FETCH)
Endpoint: /get
Method: GET
Read all data from database:
// index.js
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
Example Request:
Example Response:
Update Data (UPDATE) 
Endpoint: /update/id
Method: PUT
Update an existing data from database:
//index.js
app.put('/update/:id', async (req, res) => {
try {
const id = req.params.id;
if (!ObjectId.isValid(id)) {
return res.status(400).send({ error: 'Invalid ID format'
});
}
const updatedItem = req.body;
const result = await collection.updateOne(
{ _id: new ObjectId(id) },
{ $set: updatedItem }
);
if (result.matchedCount === 0) {
return res.status(404).send({ error: 'Player not found'
});
}
res.send({ message: 'Player updated' });
} catch (err) {
console.error('Failed to update player', err);
res.status(500).send({ error: `Failed to update player: 
${err.message}` });
}
});
Example Request:
After endpoint give the id of object you want to modify, in body select ‘raw’ ‘JSON then in input 
field add your updated text in JSON format
Example Response:
Delete data (DELETE)
Endpoint: /delete/id
Method: DELETE
DELETE an existing data from database:
// index.js
// Delete Data (DELETE)
app.delete('/delete/:id', async (req, res) => {
try {
const id = req.params.id;
console.log(`Deleting player with id: ${id}`); // Log the id 
being deleted
const result = await collection.deleteOne({ _id: new
ObjectId(id) });
if (result.deletedCount === 0) {
return res.status(404).send({ error: 'Player not found'
});
}
res.send({ message: 'Player deleted' });
} catch (err) {
console.error('Failed to delete player', err);
res.status(500).send({ error: `Failed to delete player: 
${err.message}` });
}
});
Example Request:
After endpoint give the id of object you want to delete, in body select ‘raw’ ‘JSON then in input 
field add your updated text in JSON format
Example Response:
Make sure your host is on, MongoDB also
By these steps, you can now build RESTful API and you can connect with server. You can do 
CRUD Operations in database through API using Node.js and Express.js.
You can say “In this era of AI who will read documentation”
But a programmer should have a habit of reading documentation like drinking coffee.
Connect with me:
Abtahi Md. Mahib Uddin
GitHub || Portfolio || LinkedIn || Email || Facebook
Check out this API Documentation in:
Postman : https://documenter.getpostman.com/view/36920253/2sA3kPo46s
GitHub : https://github.com/abtaaahi/node-mongodb-crud-api
