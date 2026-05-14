//create API(REST API)->REpresentational State Transfer
//Route to handle GET req of Client(http://localhost:3000/users)//here in REST API after port number it should not be verbs it should be noun,and we use local host as we are hosting it locally
//test data(replace this data with DB)


//create mini-express application(Seperate Route)
import exp from "express"
export const userApp=exp.Router()
let users=[]

//get all users
userApp.get('/users',(req,res)=>{//here we pass the path after port number as till port number it helps us to reach web server later it decides which route it is handled
   //read all users & send request
    res.json({message:"all users",payload:users})
})

//get user by id
userApp.get('/users/:id',(req,res)=>{
    //get id of user from url parameter
    let idOfUrl=Number(req.params.id)
    //find index of user
    let user=users.find(userObj=>userObj.id===idOfUrl)
   //if user not found
   if(user===undefined){
    return res.json({message:"user not found"})
   }
   //read all users & send request
    res.json({message:"all users",payload:user})

})

//Route to handle POST req of Client. Create user
userApp.post('/users',(req,res)=>{
   //get user from client
   const newUser=req.body
   //push user into users
    users.push(newUser)
   //send res
   res.json({message:"user created"})
})

//Route to handle PUT req of Client. Modify the user
userApp.put('/users',(req,res)=>{
    //get modified user from client{}
     let modifiedUser=req.body;
    //get index of existing user in users array
    let index=users.findIndex(userObj=>userObj.id===modifiedUser.id)
    //if user not found
    if(index===-1){
        return res.json({message:"user not found"})
    }
    //update user with index
    users.splice(index,1,modifiedUser)
    //send response
    res.json({message:"user updated"})
})

//Route to handle DELETE req of Client. To delete the user
userApp.delete('/users/:id',(req,res)=>{ //:id the only it can identify it as url parameter
    //get id of user from url parameter
    let idOfUrl=Number(req.params.id)
    //find index of user
    let index=users.findIndex(userObj=>userObj.id===idOfUrl)
        //if user not found
        if(index===-1){
    return res.json({message:"user not found to delete"})
        }
        //delete user from index
        users.splice(index,1)
        //send res
        res.json({message:"user removed"})
    
})
