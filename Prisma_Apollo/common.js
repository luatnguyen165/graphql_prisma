const { PrismaClient } = require(".prisma/client")
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const decodeToken = (req,requireAuth=true)=>{
    const header = req.req.headers.authorization;
   if(header){
       var  token = header.replace('Bearer','')
        token =token.split(' ')[1]
       const decoded = jwt.verify(token, 'MYKEY');
       req.userId = decoded.userId;
       return decoded;
     }
   
     if (requireAuth) {
       throw new Error('Login in to access resource');
     } 
   
     return null
}
module.exports={
    prisma,
    decodeToken
}

