const { throwHttpGraphQLError } = require("apollo-server-core/dist/runHttpQuery");
// const { prisma } = require("./common");
const { decodeToken } = require("./common");
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')

const resolvers = {
    Query: {
    getAll:async(parent,args,{prisma,req})=>{
        decodeToken(req)
        console.log(req.userId);
         const a = await prisma.users.findMany({
            include:{
                cars:true,
                roles:true
            }
                

        });
       
        return a;
    },
    getUser: async (parent,args)=>{
        try {
            
            return await prisma.users.findUnique({
                where:{
                    id:Number(args.id)
                }
            })
        } catch (error) {
            throwHttpGraphQLError(404,error)
        }
       
    }
    },
    Mutation:{
        // singleUpload: async (parent, { file }) => {
        //     const { stream, filename, mimetype, encoding } = await file;
    
        //     // Do work 💪
    
        //     return { filename, mimetype, encoding, url: '' }
        // },
        createRoles: async(parent,{name})=>{
            return await prisma.roles.create({
                data:{
                    name
                }
            })
        },
        createRoleUser: async(parent,{role_id,user_id})=>{
            return await prisma.role_has_User.create({
                data:{
                    role_id,
                    user_id
                }
            })
        },
        createRolePermission: async(parent,{role_id,permission_id})=>{
            return await prisma.role_has_Permission.create({
                data:{
                    role_id,
                    permission_id
                }
            })
        },
        createPermissions: async(parent,{name})=>{
            return await prisma.permissions.create({
                data:{
                    name
                }
            })
        },
        createCar: async(parent,{year,model,userId})=>{
            try {
                    return await prisma.car.create({
                        data:{
                            year,
                            model,
                            userId
                        }
                    })
            } catch (error) {
                
            }
        },
        login:async(parent,{email,password})=>{
            try {
                console.log(email);
                     const user = await prisma.users.findFirst({
                         where:{
                             email
                         }
                     }) 
                     console.log(user); 
                     if(!user){
                         return {
                             ok:false,
                             token:null,
                             refreshToken:null
                         }
                     }
                     const isMatch = await bcrypt.compareSync(password,user.password);
                     if(!isMatch) {
                        return {
                            ok:false,
                            token:null,
                            refreshToken:null
                        }
                     }
                     const accessToken = jwt.sign({
                         userId : user.id
                     },'MYKEY',{
                         expiresIn:'1d'
                     })
                     const ReToken = jwt.sign({
                        userId : user.id
                    },'MYKEY',{
                        expiresIn:'1d'
                    })
                     return {
                         ok:true,
                         token:accessToken,
                         refreshToken:ReToken
                     }
            } catch (error) {
                throwHttpGraphQLError(error)
            }
        },
        register: async (parent,args)=>{
            try {
                const pass = await bcrypt.hashSync(args.password,Number(process.env.SALT_ROUND))
                const user = await prisma.users.create({
                    data:{
                        username:args.username,
                        password:pass,
                        email: args.email

                    }
                })
                return user
            } catch (error) {
                throwHttpGraphQLError(404,error)
            }
        }
    }
}
   
module.exports = resolvers;