import mongoose from "mongoose"

export  const connectDB = async ()=>{
    try {
     const res = mongoose.connect(process.env.MONGODB_URI)
     if(res){
        console.log("database is connected") 
     }   
    } catch (error) {
        console.log("error in connect DB",error)
    }
}