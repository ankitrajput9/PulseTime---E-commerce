import dotenv from "dotenv"
dotenv.config()
import ImageKit from "imagekit"

console.log("URL:", JSON.stringify(process.env.IMAGEKIT_URL));
console.log("PUBLIC:", JSON.stringify(process.env.IMAGEKIT_PUBLIC_KEY));
console.log("PRIVATE:", JSON.stringify(process.env.IMAGEKIT_PRIVATE_KEY));


const imageInstance = new ImageKit({
    urlEndpoint:process.env.IMAGEKIT_URL,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

export const Imagekitsend = async(file,fileName)=>{
    return await imageInstance.upload({
        file,
        fileName,
    })
}