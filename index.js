const express = require('express');
var cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
// console.log(process.env.DB_USER);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.octeyq5.mongodb.net/?retryWrites=true&w=majority`;

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
    
    // await client.connect();

    const technologyCollcetion = client.db("technologyDB").collection("technology");
    const brandCollcetion = client.db("technologyDB").collection("brand");
    const addCollcetion = client.db("technologyDB").collection("add");
    const sliderCollcetion = client.db("technologyDB").collection("slider");
    const cardCollcetion = client.db("technologyDB").collection("card");
    


    app.get('/brandproducts',async(req,res)=>{
        const cursor = technologyCollcetion.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.get('/brandproducts/:id',async(req,res)=>{
      const id =req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await technologyCollcetion.findOne(query);
      res.send(result);
  })
   

  app.post('/brandproducts',async(req,res)=>{
      const newBrand = req.body;
      console.log(newBrand);
      const result =await technologyCollcetion.insertOne(newBrand);
      res.send(result) 
  })

    // update
    app.get('/brandproducts/:id',async(req,res)=>{
      const id =req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await technologyCollcetion.findOne(query);
      res.send(result)
  })
  
  // update data client to server
  app.put('/brandproducts/:id', async(req,res)=>{
    const id =req.params.id;
    const filter ={_id:new ObjectId(id)}
    const options ={upsert: true};
    const updatedProduct =req.body;
    const product = {
      $set:{
        name:updatedProduct.name, 
        brand:updatedProduct.brand, 
        price:updatedProduct.price, 
        description:updatedProduct.description, 
        catogray:updatedProduct.catogray, 
        rating:updatedProduct.rating, 
        photo:updatedProduct.photo
      }
    }
    const result =await technologyCollcetion.updateOne(filter,product,options)
    res.send(result)
  })

 

    // slider
    app.get('/sliderproducts',async(req,res)=>{
      const cursor = sliderCollcetion.find();
      const result = await cursor.toArray();
      res.send(result)
  })
    app.post('/sliderproducts',async(req,res)=>{
        const newBrand = req.body;
        console.log(newBrand);
        const result =await sliderCollcetion.insertOne(newBrand);
        res.send(result) 
    })


    

    app.get('/brand',async(req,res)=>{
      const cursor = brandCollcetion.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/brand/:id',async(req,res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await brandCollcetion.findOne(filter)
      res.send(result)
    })

    app.post('/brand',async(req,res)=>{
        const newBrand = req.body;
        console.log(newBrand);
        const result =await brandCollcetion.insertOne(newBrand);
        res.send(result) 
    })

    app.get('/addproducts',async(req,res)=>{
      const cursor = addCollcetion.find();
      const result = await cursor.toArray();
      res.send(result)
  })

    app.post('/addproducts',async(req,res)=>{
      const newBrand = req.body;
      console.log(newBrand);
      const result =await addCollcetion.insertOne(newBrand);
      res.send(result) 
  })
      // my card
      app.get('/cardproducts',async(req,res)=>{
        const cursor = cardCollcetion.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    // my card
    app.get('/cardproducts/:id',async(req,res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await cardCollcetion.findOne(filter)
      res.send(result)
    })
    // delete method Complete
    // my card
    app.delete('/cardproducts/:id', async(req,res)=>{
      const id =req.params.id;
      const query ={_id: new ObjectId(id)}
      const result = await cardCollcetion.deleteOne(query);
      res.send(result);
    })
    // my card
    app.post('/cardproducts',async(req,res)=>{
      const newBrand = req.body;
      console.log(newBrand);
      const result =await cardCollcetion.insertOne(newBrand);
      res.send(result) 
  })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}
run().catch(console.dir);


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
















    