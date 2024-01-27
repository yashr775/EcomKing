import express,{Request,Response} from "express";
import Razorpay from "razorpay";

require('dotenv').config({path:'../.env'})

const router=express.Router();

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

router.post("/order",async (req:Request,res:Response)=>{

    try {

        if(!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET){
            return res.status(500).send("Missing Key");
        }

        const razorpay =new Razorpay({
            key_id:RAZORPAY_KEY_ID!,
            key_secret:RAZORPAY_KEY_SECRET
        })

        const currency = "USD"

        const options =req.body;
        options.currency="USD";
        console.log(options)
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error");
          }
      console.log(order);
         return res.json(order);

        
    } catch (error) {
        console.error("Internal server error :: "+error);
        console.log(error);
       return res.status(500).send("Some Error occured");
    }

})


module.exports=router