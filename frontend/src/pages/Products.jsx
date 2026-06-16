import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Outlet } from 'react-router';

const Products = () => {


const  {products} = useSelector((state)=>state.products)

console.log(products)

  return (
    <div className='min-h-screen flex flex-wrap justify-center gap-4 text-white bg-[#050505] py-30 px-4 relative overflow-hidden selection:bg-[#C5A059] selection:text-black'>
     {products.map((elem)=> <ProductCard key={elem.id} product={elem} />)}
   
      <Outlet/>
    </div>
  );
}

export default Products;
