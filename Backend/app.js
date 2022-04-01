const express =require('express');
const app =express();
const bodyParser =require('body-parser');
const morgan =require('morgan');
const mongoose =require('mongoose');


// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

const api =process.env.API_URL;

const productSchema =mongoose.Schema ({
    name: String,
    image :{
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }
})

const Product =mongoose.model('Product',productSchema);


app.get(`${api}/products`,async(req, res)=>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success: false});
    }
    res.send(productList);
})

app.post(`${api}/products`,(req, res)=>{
   const product = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock :req.body.countInStock,
   })
   product.save().then ((createdProduct =>{
      res.status(201).json(createdProduct) 
   })).catch((err)=> {
       res.status(500).json({
       error: err,
       success:false
         })
   })
 
})

mongoose.connect(process.env.CONNECTION_STRING)
 .then (()=>{
     console.log('Database Connection IS ready..')
 })
 .catch((err)=>
 {
    console.log(err);
 })

app.listen(3000, ()=>{
  
    console.log('server is runnig http://localhost:3000')
})