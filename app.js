require("dotenv").config();

const express = require("express");
const app = express();
const connect = require("./db/connect");




const PORT = process.env.PORT || 5000;
const showProducts = require("./routes/products");
const connectDB = require("./db/connect");
app.get('/', (req, res) => {
    res.send("Search /api/products for fetching products & use '?page=2' for the next page of products API");

});

app.use("/api/products", showProducts);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, (req,res) => {
            console.log(`${PORT} Connection done`)
      })  
    } catch (error) {
        console.log(error)
        
    }
}

start();
