export  const errorMiddleware = (err,req,res,next)=>{
console.log("error in error middleware -->",err)

const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        message:err.message || "internal server error"
    })

}
