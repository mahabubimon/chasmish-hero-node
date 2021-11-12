// Require Packages
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

// App Create
const app = express();
const port = process.env.PORT || 5000;

// Middle Wire
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@randomdb.rfcve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//  Create Client in MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Server Run Function Expression
const run = async () => {
  try {
    await client.connect();
    const database = client.db("chasmish-hero");
    const glasse
    sCollection = database.collection("glasses");
    // const ordersCollection = database.collection("orders");

    // Get API - Glasses
    app.get("/glasses", async (req, res) => {
      const cursor = glassesCollection.find({});
      const glasses = await cursor.toArray();
      res.send(glasses);
    });
  } catch {
  } finally {
    // await client.close();
  }
};

// Server Run Function Invoke
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Chasmish Hero Server Successfully.....");
});

app.listen(port, () => {
  console.log("Running Chasmish Server Successfully on port: ", port);
});
