const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Cluster29216:OdhnJHBb6Ue9xdAp@namastenode.jljfzq5.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamasteNode"
    );
}

module.exports = connectDB;