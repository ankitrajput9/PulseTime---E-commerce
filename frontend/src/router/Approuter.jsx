import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Authlayout from '../layout/Authlayout';
import Protectedroute from '../components/Protectedroute';
import Publicroute from '../components/Publicroute';
import Homelayout from '../layout/Homelayout';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import CreateProduct from '../pages/CreateProduct';
import Home from '../pages/Home';
import { axiosInstance } from '../mediaApi/ApiInstance';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/authSlice';
import { useEffect } from 'react';
import ProductDetails from '../sections/ProductDetails';

const Approuter = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            try {
                let res = await axiosInstance.get("/auth/current-user")
                console.log(res.data)
                if (res) {
                    dispatch(addUser(res.data.user))
                }

            } catch (error) {

                console.log("error in current login usre", error)
            }
        })()
    }, [])



    const router = createBrowserRouter([
        {
            path: "/",
            element: <Protectedroute />,
            children: [
                {
                    index: true,
                    element: <Authlayout />
                }
            ]
        },
        {
            path: "/home",
            element: <Publicroute />,
            children: [
                {
                    path: '',
                    element: <Homelayout />,
                    children: [
                        {
                            index: true,
                            element: <Home />
                        },
                        {
                            path: "products",
                            element: <Products />,
                        },
                        {

                            path: "products/:productId",
                            element: <ProductDetails />

                        },
                        {
                            path: "cart",
                            element: <Cart />
                        },
                        {
                            path: "create-product",
                            element: <CreateProduct />
                        }
                    ]

                }
            ]
        }
    ])


    return <RouterProvider router={router} />

}

export default Approuter;
