// Require Packages
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

// App Create
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@randomdb.rfcve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DataBase Connection Function
const run = async () => {
  try {
    await client.connect();
    const database = client.db("chasmish-hero");
    const usersCollection = database.collection("users");
    const glassesCollection = database.collection("glasses");
    const ordersCollection = database.collection("orders");
    const reviewsCollection = database.collection("reviews");

    // Post API - User Add
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.json(result);
    });

    // Get API - Users
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    //  Update API - User
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    // Get API - Admin
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let isAdmin = false;
      if (user?.role === "admin") {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });

    // Update API- Add New Admin
    app.put("/addAdmin", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const updateDoc = { $set: { role: "admin" } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    // Get API - Glasses
    app.get("/glasses", async (req, res) => {
      const cursor = glassesCollection.find({});
      const glasses = await cursor.toArray();
      res.send(glasses);
    });

    // Find API - Glass
    app.get("/glasses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await glassesCollection.findOne(query);
      res.json(result);
    });

    // Post API - Glasses
    app.post("/glasses", async (req, res) => {
      const glass = req.body;
      const result = await glassesCollection.insertOne(glass);
      res.json(result);
    });

    // Delete API - Glasses
    app.delete("/glasses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await glassesCollection.deleteOne(query);
      res.json(result);
    });

    // Post API- Orders
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.json(result);
    });

    // Get API - orders
    app.get("/orders", async (req, res) => {
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    // Delete API - Order
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ordersCollection.deleteOne(query);
      res.json(result);
    });

    // Post API- Reviews
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.json(result);
    });

    // Get API - Reviews
    app.get("/reviews", async (req, res) => {
      const cursor = reviewsCollection.find({});
      const reviews = await cursor.toArray();
      res.send(reviews);
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
