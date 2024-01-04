import express from "express";
import cors from "cors"
const app = express();

app.use(cors());


const PORT = 5000;

app.use('/api/user',require('/routes/user'));

app.listen(PORT,()=>{
    console.log("App is listening on port $PORT}")
})