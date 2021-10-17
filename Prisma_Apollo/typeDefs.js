const {  gql} = require('apollo-server-express');
const typeDefs =gql`
   type User{
   id:ID!
   username: String
   password: String
   email: String
   cars: [Car]
   profile: Profile
   roles:[Role_has_User]
  }
  type Role_has_User{
  id:ID!
  role_id:Int
  user_id:Int
  }
  type Roles{
    id:ID
    name:String
    permissions:[Role_has_Permission]
  }
  type Role_has_Permission{
    id:ID!
    role_id: Int
    permission_id: Int
  }
  type Permissions{
    id:ID!
    name: String
    roles:[Role_has_Permission]
  }
  type Car{
      id:ID!
      year: Int 
      model:String
      userId: Int
  }
  type Profile{
    id: ID
    avartar: String
    address: String
    phone: String
    userId: Int!
  }
  type Query {
    getAll: [User!]
    getUser(id:ID): User!
  }
  type UserLoginReponse{
    ok: Boolean,
    token:String,
    refreshToken:String
  }
  type UploadedFileResponse {
      filename: String!
      mimetype: String!
      encoding: String!
      url: String!
    }
  type Mutation{
    createRoles(name:String):Roles!
    createPermissions(name:String):Permissions!
    createRoleUser(role_id:Int,user_id:Int):Role_has_User!
    createRolePermission(role_id: Int,permission_id: Int):Role_has_Permission!
    createProfile(avartar:String,address:String,phone:String,userId:Int):Profile!
    createCar(year:Int,model:String,userId:Int):Car!
    register(username:String,password:String,email:String):User!
    login(email:String,password:String):UserLoginReponse!
    # singleUpload(file: Upload!): UploadedFileResponse!
  }
`
module.exports =typeDefs

