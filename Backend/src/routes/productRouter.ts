import express , { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import isAuth from "../../middleware/isAuth"

const prisma= new PrismaClient();

const router = express.Router();

router.post("/addproducts",isAuth,async (req:Request,res:Response)=>{
try {
    const id = req.user._id;

    if(!id){
      return  res.status(400).send("You are not autherized")
    }

    const user = await prisma.user.findUnique({where:{id}})

    if(!user || !user.isAdmin){
       return res.status(400).send("You are not autherized")
    }
    const {name , slug ,image,brand,category,description,price,countInStock,rating,numReviews} = req.body;

    const product = await prisma.products.create({data:{
            name,slug,image,brand,category,description,price,countInStock,rating,numReviews
    }})

    return res.status(200).send(product);
} catch (error){
    
    console.log('Internal server error');
    console.error('Internal server error :: ' + error);
    return res.status(500).send('Some error occurred');
    }
     finally {
  await prisma.$disconnect();
    }
    
})

router.get("/getproductsbyslug/:slug",async (req:Request,res:Response) => {

    try {
        const slug = req.params.slug;

        const product = await prisma.products.findUnique({where:{slug}});

        res.status(200).json(product);
    } catch (error) {
        console.log("Internal server error");
        console.error("Internal server error :: "+error);
        return res.status(403).send("Some error occured");
    }finally{
        prisma.$disconnect
    }

   

})

router.get("/getallproducts",async (req:Request,res:Response)=>{
    try {
        const products = await prisma.products.findMany()
        return res.status(200).json(products);
    } catch (error) {
        console.log("Internal server error ");
        console.error("Some error occured :: "+error)
        return res.status(403).send("some error occured");
    }finally{
        prisma.$disconnect
    }
  
})

router.delete("/deleteproduct/:slug",isAuth,async (req:Request,res:Response) => {
 
try {

const id = req.user._id;

const user = await prisma.user.findUnique({where:{id}});

if(!user || !user.isAdmin){
    return res.status(403).send("Unautherized")
}

const slug = req.params.slug;

const deletedProduct  = await prisma.products.delete({where:{slug}})

return res.status(403).json(deletedProduct);
    
} catch (error) {
    console.log("Internal Server Error")
    console.error("Internal Error :: "+error);
    return res.status(403).send("Internal server error");
}finally{
    prisma.$disconnect
}
})

module.exports = router;
