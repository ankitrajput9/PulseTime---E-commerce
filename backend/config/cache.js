import { cacheInstance } from "../services/cache.service.js"


  export const cacheConnect = ()=>{

    cacheInstance.on("connect", () => {
        console.log("Redis is running")
    })
    
    cacheInstance.on("error", (err) => {
        console.log("error in connection Redis", err)
    })

  }