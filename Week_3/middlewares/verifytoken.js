import jwt from "jsonwebtoken";
const {verify} = jwt;


export function verifyToken(req, res, next){
    const token = req.cookies?.token;
   console.log(token) // to access coockeies of request of object we need cookies parser middleware. Otherwise req.cookies is undifined
   //if req from unauthoraized user
   if(!token){
    return res.status(401).json({message:"Please Login to the application"})
   }
   try {
    //if token is present
    const decodedToken = verify(token,'abcdef')
    console.log(decodedToken) 
    //attach decded user to the request
    req.user = decodedToken;
    next();
   }catch(err){
    res.status(401).json({message:"session expired, please login again"})
   }
   }
