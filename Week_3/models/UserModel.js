import {Schema, model, Types} from 'mongoose'


//create cart schema {product, count}
const CartSchema = new Schema({
    product:{
        type:Types.ObjectId,
        ref:"product"//name of the product model
    },
    count:{
        type:Number,
        default:1
    }
}
)



//Create User Schema
const UserSchema = new Schema({
    // structure of User resources
    username:{
        type:String, // this is Mongoose Schema type not js datatype
        required:[true, "Username is required"],
        minLength:[4,"Min length of Username is 4 chars"],
        maxLength:[20,"Username size exceed 6 chars"],
        unique:[true, "Username already exists"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:[true, "Email already exists"]
    },
    age:{
        type:Number
    },
    cart:[CartSchema] // if any of the conditions is not followed while entering the username it sends and error. It can accept only {product:"", count:2}
},{
    timestamps:true,
    versionKey:false
})


//Generate UserModle
export const UserModel = model("user", UserSchema) // here when we pass user as string a 'users' collection is created in monogDB

