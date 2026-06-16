import React, { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../mediaApi/ApiInstance';
import { allCartItems } from '../features/cartSlice';
import { getproducts } from '../features/productSlice';
import FeaturesSection from '../sections/FeaturesSection';
import SpecificationVault from '../sections/SpecificationVault';
// import LaunchHypeSection from '../sections/LaunchHypeSection';
// import TechnicalBlueprint from '../sections/TechnicalBlueprint';

const Home = () => {

const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let res = await axiosInstance.get(`/cart`)
      let cartData = res.data.cartProducts.items
  dispatch(allCartItems(cartData))
    })()

  }, [])


  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axiosInstance.get("/products/");
          dispatch(getproducts(res.data.products));

          console.log(res)
        } catch (error) {
          console.log("API Error:", error);
        }
      };
        fetchProducts();
      
    }, [dispatch]);


  return (
       <div className='min-h-screen bg-[#050505]  relative overflow-hidden selection:bg-[#C5A059] selection:text-black'>

<FeaturesSection/>
<SpecificationVault/>


<HeroSection/>
      
    </div>
  );
}

export default Home;
