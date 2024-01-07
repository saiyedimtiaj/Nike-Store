const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

    app.get("/products", async (req, res) => {
      const result = await allProductsColluction
        .find()
        .sort({ sellCount: "desc" })
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

    app.get("/productcount", async (req, res) => {
      const count = await allProductsColluction.estimatedDocumentCount();
      res.send({ count });
    });

    app.get("/allproduct", async (req, res) => {
      const projection = {
        _id: 1,
        name: 1,
        description: 1,
        images: 1,
        price: 1,
        category: 1,
      };
      const currentPage = parseInt(req.query.currentPage);
      let category = {}
      if(req.query?.category === 'all'){
        category = {}
      }
      else{
        category.category = req.query?.category
      }
      const sortObj = {};
      const sortField = req.query.sortField;
      const sortBy = req.query.sortBy;
      if (sortField && sortBy) {
        sortObj[sortField] = sortBy;
      }
      const result = await allProductsColluction
        .find(category)
        .sort(sortObj)
        .project(projection)
        .skip(currentPage * 6)
        .limit(6)
        .toArray();
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
      const updateDoc = {
        $set: {
          quantity: req.body.quantity,
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

    app.post('/handle-payment-success', async (req, res) => {
      const cartItems = req.body;
    
      // Save payment details to MongoDB
      const payment = {
        session_id: req.body.id,
        // Add other fields as needed
      };
    
      try {
        await paymentsCollection.insertOne(payment);
        res.json({ success: true, message: 'Payment details saved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to save payment details' });
      }
    });

    app.post('/create-checkout-session',async(req,res)=>{
      const product = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:product.map(product=>({
          price_data:{
            currency: "inr",
            product_data:{
              name:product.name,
            },
            unit_amount:product.price * 100
          },
          quantity:product.quantity
        })),
        mode:"payment",
        success_url:'http://localhost:5173/sucess',
        cancel_url:'http://localhost:5173/cancel'
      })
      res.json({id:session.id})
    })

    // {"price":{$gte: 120, $lte: 150}}

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
