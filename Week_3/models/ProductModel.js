import {Schema, model} from 'mongoose'

//Create Product Schema
const ProductSchema = new Schema({
    // structure of User resources
    productId:{
        type:String, // this is Mongoose Schema type not js datatype
        required:[true, "ProductId is required"],
        minLength:[2,"Min length of Username is 2 chars"],
        maxLength:[20,"Username size exceed 20 chars"],
        unique:[true, "ProductId already exists"]
    },
    productName:{
        type:String,
        required:[true, "ProductName is required"]
    },
    pice:{
        type:Number,
        required:[true, "Email is required"],
        min:[10000],
        max:[150000]
    },
    brand:{
        type:String,
        required:[true, "Brand is required"]
    } // if any of the conditions is not followed while entering the username it sends and error
},{
    timestamps:true,
    versionKey:false
})


//Generate ProductModel
export const ProductModel = model("product", ProductSchema) // here when we pass user as string a 'users' collection is created in monogDB
