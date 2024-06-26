const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(
  cors({
    origin: ["https://mern-stack-nike-ecomarce.netlify.app"]
  })
);
app.use(express.json());
app.use(cookieParser());

//  "http://localhost:5173"
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xslrw3a.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const allProductsColluction = client.db("nike").collection("allproduct");
    const cartColluction = client.db("nike").collection("cart");
    const userColluction = client.db("nike").collection("user");
    const orderColluction = client.db("nike").collection("order");


    app.get("/products", async (req, res) => {
      const result = await allProductsColluction
        .find()
        .sort({ sellCount: "desc" })
        .toArray();
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const body = req.body;
      const result = await allProductsColluction.insertOne(body);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allProductsColluction.deleteOne(query);
      res.send(result);
    });

    app.get("/dashboard-allProduct", async (req, res) => {
      const currentPage = parseInt(req.query.currentPage);
      const result = await allProductsColluction
        .find()
        .skip(currentPage * 10)
        .limit(10)
        .toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await allProductsColluction.findOne(filter);
      res.send(result);
    });

    app.get("/search-product", async (req, res) => {
      const searchQry = req.query.search;
      const projection = {
        _id: 1,
        name: 1,
        description: 1,
        images: 1,
      };
      const result = await allProductsColluction
        .find({ name: { $regex: ".*" + searchQry + ".*", $options: "i" } })
        .project(projection)
        .toArray();
      res.send(result);
    });

    app.get("/dashboardCount", async (req, res) => {
      const product = await allProductsColluction.estimatedDocumentCount();
      const user = await userColluction.estimatedDocumentCount();
      const order = await orderColluction.estimatedDocumentCount();
      res.send({ product, user, order });
    });

    app.get("/productcount", async (req, res) => {
      const count = await allProductsColluction.estimatedDocumentCount();
      res.send({ count });
    });

    app.get("/allproduct", async (req, res) => {
      const { minVal, maxVal } = req?.query;
      const projection = {
        _id: 1,
        name: 1,
        description: 1,
        images: 1,
        price: 1,
        category: 1,
      };
      const currentPage = parseInt(req.query.currentPage);
      let query = {};
      if (req.query?.category === "all") {
        query = {};
      } else {
        query.category = req.query?.category;
      }
      const sortObj = {};
      const sortField = req.query.sortField;
      const sortBy = req.query.sortBy;
      if (sortField && sortBy) {
        sortObj[sortField] = sortBy;
      }
      if (minVal && maxVal) {
        query.price = { $gte: parseInt(minVal), $lte: parseInt(maxVal) };
        console.log(minVal, maxVal);
      }
      const result = await allProductsColluction
        .find(query)
        .sort(sortObj)
        .project(projection)
        .skip(currentPage * 6)
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const body = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...body,
        },
      };
      const result = await allProductsColluction.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const body = req.body;
      const result = await cartColluction.insertOne(body);
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query?.email;
      const query = { email: email };
      const result = await cartColluction.find(query).toArray();
      res.send(result);
    });

    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const cartItem = await cartColluction.findOne(query);
      const updateDoc = {
        $set: {
          quantity: req.body.quantity,
          price: cartItem.price * parseInt(req.body.quantity),
        },
      };
      const result = await cartColluction.updateOne(query, updateDoc, options);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartColluction.deleteOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const body = req.body
      const filter = { email: req?.body?.email };
      console.log(filter);
     
      const query = await userColluction.findOne(filter);
      if (query) {
        return res.status(400).json({ message: "User with this email already exists" });
      } 
        const result = await userColluction.insertOne(body);
        res.send(result);
    });

    app.get("/users", async (req, res) => {
      const email = req?.query?.email;
      const filter = { email: email };
      console.log(filter);
      const result = await userColluction.findOne(filter);
      res.send(result);
    });

    app.get("/allusers", async (req, res) => {
      const result = await userColluction.find().toArray();
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/orders", async (req, res) => {
      const body = req.body;
      const orderResult = await orderColluction.insertOne(body);
      const query = {
        _id: {
          $in: body.cartId.map((id) => new ObjectId(id)),
        },
      };
      const cartResult = await cartColluction.deleteMany(query);
      res.send({ orderResult, cartResult });
    });

    app.get("/orders", async (req, res) => {
      const query = {};
      const sortBy = req.query?.soryby;
      if (sortBy) {
        query.date = -1;
      }
      const result = await orderColluction.find().sort(query).toArray();
      res.send(result);
    });

    client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("nike website is open");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
