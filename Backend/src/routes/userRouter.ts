import express ,{Request,Response} from "express";
import {z} from "zod";
import { fromZodError} from "zod-validation-error"
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
require('dotenv').config({ path: '../.env' });
const JWT_SECRET = process.env.JWT_SECRET ||"some random secret"; 

const prisma = new PrismaClient();


const router = express.Router();

const createUserSchema = z.object({
    name:z.string().min(3,"Minimum 5 characters required"),
email:z.string().email("Wrong email format"),
password:z.string().min(5,"Minimum 5 characters required")});

const loginUserSchema = z.object({
    email:z.string().email("Wrong Email Format"),
    password:z.string().min(5,"Minimum 5 characters required")
});


router.post('/createuser',async (req:Request,res:Response) => {

    try {
let success =false;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

        const {name , email ,password} =req.body;

        const hashedPassword =bcrypt.hashSync(password,salt);

        const userObj ={name,email,password:hashedPassword}
    
        const validationResult = createUserSchema.safeParse(userObj);
    
        if(!validationResult.success){
            return res.status(200).send(fromZodError(validationResult.error))
        }

        const user = await prisma.user.findUnique({
            where:{email:email}
        })
        
        if(user){
           return  res.status(200).send("User with the given email already exist")
        }

        const createdUser = await prisma.user.create(
            {data:
                {name:userObj.name,
                    email:userObj.email,
                    password:userObj.password,
                    isAdmin:false}})

                    const userId = createdUser.id;
                    const data = { user: {_id: userId } };
                    const token = jwt.sign(data, JWT_SECRET!);
            
                    if (token) success = true;
            
                    return res.json({ success, token });
          
  } catch (error) {
        console.log('Internal server error');
        console.error('Internal server error :: ' + error);
        return res.status(500).send('Some error occurred');
      }
      finally {
          await prisma.$disconnect();
        }
})


router.post("/login", async (req:Request,res:Response)=>{

    try {
        let success =false;

        const {email , password} = req.body;

        const  signinObj = {email,password};
      
        const  validationResult  = loginUserSchema.safeParse(signinObj);
      
        if(!validationResult.success){
          res.status(400).send(fromZodError(validationResult.error))
        }
      
        const user = await prisma.user.findUnique({where:{email}})
      
        if(!user){
          return res.status(400).send("Invalid email or password");
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
      
        if(!isPasswordValid){
          return res.status(400).send("Invalid username or password");
        }

        const data = {user : {_id : user.id}};

        const token =jwt.sign(data,JWT_SECRET!);
        success = true;

        return res.status(200).json({success ,token})

    } catch (error) {
        console.log('Internal server error');
        console.error('Internal server error :: ' + error);
        return res.status(500).send('Some error occurred');
    }finally{
           prisma.$disconnect
    }
 

})

module.exports =router