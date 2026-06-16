import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Approuter from './router/Approuter.jsx'
import { Provider } from 'react-redux'
import { store } from './config/store.jsx'
import { useEffect } from 'react'
import Preloader from './components/Preloader.jsx'
import { useState } from 'react'

const Rootrender = ()=>{
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
const hasLoading = sessionStorage.getItem("hasLoading")

if(hasLoading){
  setLoading(false)
  return
}
else{
sessionStorage.setItem("hasLoading","true")
  let timer = setTimeout(()=>{
  setLoading(false)
  },5000)
}


return ()=>{clearTimeout(timer)}

  },[])

  return loading ?<Preloader/>:<Approuter/>
}
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <Rootrender/>
</Provider>
  
)
