import express from "express";

const app = express();

var cors =require('cors');

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use('/api/user',require("./src/routes/userRouter"));
app.use('/api/products',require("./src/routes/productRouter"));
app.use('/api/orders',require("./src/routes/orderRouter"))
app.use('/api/payment',require("./src/routes/paymentRouter"))

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})