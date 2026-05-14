import exp from "express";
const app = exp()
import { userApp } from "../APIs/UserAPI.js"
import { productApp } from "..APIs/ProductAPI.js"

app.use(exp.json())

function middlewre1(req, res, next){
    // res.json({message:"this res from middleware1"})
    console.log("middleware1 executed")
    next()
}
function middleware2(req, res, next){
    // res.json({message:"this res from middleware1"})
    console.log("middleware2 executed")
    next()
}


//use middleware1
app.use(middlewre1)
app.use(middleware2)

//forward req to userAPI of path start with /user-api
app.use('/user-api', userApp)
app.use('/product-api', productApp)

const port = 3000

app.listen(port, () => console.log("app is listening at port 3000"))

// app.use((err, req, res, next) => {
//     console.log("Err msg", err)
// })
