import express, {Request , Response} from "express";
import isAuth from "../../middleware/isAuth";
import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from 'uuid';


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

router.delete("/deleteallshippingaddress",isAuth,async (req:Request,res:Response) => {
    try {
        const userId = req.user._id;
        console.log(userId)
    
         // @ts-ignore
        const shippingAddress = await prisma.shippingAddress.deleteMany({where:{userId}})
       
        res.status(200).json(shippingAddress);
    } catch (error) {
        console.log("Some Error occured");
        console.error("Internal Server Error :: "+error)
        return res.status(403).send("some error occured");
    }
   
})




router.post("/placeorder", isAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user._id;
  
      const orderItems = req.body.orderItems;
  
      if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).send("Order items are missing or invalid");
      }
  
      // @ts-ignore
      const shippingAddress = await prisma.shippingAddress.findFirst({ where: { userId } });
  
      const shippingAddressId = shippingAddress?.id;
      if (shippingAddressId === undefined) {
        return res.status(400).send("Add  shipping address at first");
      }
  
      const {
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid,
      } = req.body;
  
      // Create the order
      const newUuid: string = uuidv4();
console.log(newUuid);
      const order = await prisma.orders.create({
        // @ts-ignore
        data: {
            id:newUuid,
          userId,
          shippingAddressId,
          itemsPrice,
          paymentMethod,
          shippingPrice,
          taxPrice,
          totalPrice,
          isPaid: false,
          paidAt: new Date(),
        },
      });
  
      // Create the associated orderItems
      await prisma.orderItem.createMany({
        data: orderItems.map((item: any) => ({
            id:uuidv4(),
          productSlug: item.productSlug,
          quantity: item.quantity,
          orderId: order.id,
        })),
      });
  
      res.status(200).send("Order placed successfully");
    } catch (error) {
      console.log("Some Error occurred");
      console.error("Internal Server Error :: " + error);
      return res.status(403).send("Some error occurred");
    }
  });

module.exports = router