const mongoose = require('mongoose');
const fs = require('fs')
const nconf = require('nconf');


const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
};


nconf.argv().env();
nconf.file('dburl', {file: './config/config.json'})
const mongoConnection = () => {

        mongoose.connect(nconf.get('dburl'), options).then(() => {
            console.log('mongodb connected');
        })
        .catch(err => {
            console.log('connection failed');
            setTimeout(mongoConnection, 5000)
        })
    }
mongoConnection();


// const { MongoClient, ServerApiVersion } = require('mongodb');

// nconf.argv().env();
// nconf.file('dburl', {file: './config/config.json'})
// const client = new MongoClient(nconf.get('dburl'), { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
exports.mongoose = mongoose;