require("dotenv").config({path:"../../.env"})
import { Request,Response,NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "some random secret"

const isAuth = (req:Request ,res:Response ,next:NextFunction) => {


    try {
        const token = req.header("auth-token");

        if(!token){
            return res.status(400).send("Invalid Token");
        }

        const data  = jwt.verify(token,JWT_SECRET) as JwtPayload

        req.user = data.user;

        next();

    } catch (error) {
        console.error("Internal server error :: " + error)
        return res.status(401).send({ error: "Some error occured" });
        
    }
}
