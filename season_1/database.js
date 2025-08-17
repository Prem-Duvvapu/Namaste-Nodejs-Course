// Steps

// 1. Go to mongodb website
// 2. Create a free M0 cluster
// 3. Create a user(if doesn't exist)
// 4. Get the connection string
// 5. Install mongodb compass gui

const { MongoClient } = require("mongodb")

const url = "mongodb+srv://Cluster29216:OdhnJHBb6Ue9xdAp@namastenode.jljfzq5.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode"

const client = new MongoClient(url);

const dbName = 'HelloWorld';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('User');

    const result = await collection.find({}).toArray();
    console.log(result);

    // const data = {
    //     firstname: "Akshay",
    //     lastname: "Saini",
    //     country: "India"
    // };

    // const insertResult = await collection.insertMany([data]);
    // console.log('Inserted documents =>', insertResult);

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());