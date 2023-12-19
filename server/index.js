const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xslrw3a.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const allProductsColluction = client.db("nike").collection("allproduct")


    app.get('/products',async(req,res)=>{
      const result = await allProductsColluction.find().sort({sellCount:'desc'}).toArray();
      res.send(result)
    })  

    app.get('/products/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = {_id:new ObjectId(id)}
      const result = await allProductsColluction.findOne(filter)
      res.send(result)
    })

    app.get('/search-product',async(req,res)=>{
      const searchQry = req.query.search;
      const projection = {
        _id: 1,
        name: 1,
        description:1,
        images:1
      };
      const result = await allProductsColluction.find({ "name":{$regex: ".*"+searchQry+".*",$options:'i'} }).project(projection).toArray()
      res.send(result)
    })

    app.get('/allproduct',async(req,res)=>{
      const projection = {
        _id: 1,
        name: 1,
        description:1,
        images:1,
        price:1
      };
      const highest = req.query?.highest
      const lowest = req.query?.lowest
      // {"price":{$gte: 120, $lte: 150}}
      const result = await allProductsColluction.find().project(projection).toArray()
      res.send(result)
    })

    client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('nike website is open')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})