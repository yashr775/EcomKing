import express, {Request , Response} from "express";
import isAuth from "../../middleware/isAuth";
import { PrismaClient } from "@prisma/client";


const router = express.Router();

const prisma = new PrismaClient();

router.post("/addshippingaddress",isAuth,async (req:Request,res:Response)=>{
    try {
        const userId=req.user._id;
        const {fullname,address,city,postalcode,country} =req.body;

        const ShippingAddressData  = {fullname,address,city,country,postalcode,userId:userId} 

        const shippingAddress = await prisma.shippingAddress.create({data:ShippingAddressData
        })

        res.status(200).send(shippingAddress);

    } catch (error) {
        console.log("Some Error occured");
        console.error("Internal Server Error :: "+error)
        return res.status(403).send("some error occured");
    }
})


// router.post("/addrouter",isAuth,(req:Request,res:Response) =>{

// })


module.exports = router