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

// Server Run Function Expression
const run = async () => {
  try {
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
