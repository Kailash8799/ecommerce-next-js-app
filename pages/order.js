import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import mongoose from "mongoose";
import Order from '../models/Order';

const Orderparticular = ({ order }) => {
  const Router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
    if (!order) {
      Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
  }, [])

  return (
    <>
      <div className='min-h-screen'>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 md:pb-24 md:pt-24 pb-24 pt-10 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order id : #{order && order.orderId}</h1>
                <p className="leading-relaxed text-md md:text-lg">Your order has been successfully placed</p>
                <p className="leading-relaxed text-md md:text-lg">Order placed on: {order && (new Date(order.createdAt)).toLocaleDateString("en-IN",{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
                <p className="leading-relaxed text-md md:text-lg mb-4">Your payment status is <span className='font-bold'>{order && order.status}</span></p>
                <div className="flex mb-4">
                  <a className="flex-grow w-3/6 text-start text-gray-900 border-b-2 border-gray-300 py-2 text-lg px-1">Order Name</a>
                  <a className="flex-grow w-2/6 text-center border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                  <a className="flex-grow w-1/6 text-center border-b-2 border-gray-300 py-2 text-lg px-1">Price</a>
                </div>
                {order && Object.keys(order.products).map((item, ind) => {
                  return <div key={ind} className="flex border-b border-gray-200 py-2">
                    <span className="w-3/6 text-gray-500">{`${order.products[item].itemname}(${order.products[item].size}/${order.products[item].variant})`}</span>
                    <span className="w-2/6 text-center ml-auto text-gray-900">{order.products[item].qty}</span>
                    <span className="w-1/6 text-center ml-auto text-gray-900">₹{order.products[item].price}</span>
                  </div>
                })}
                <div className="md:flex mt-5">
                  <span className="title-font font-medium text-2xl text-gray-900">Sub total : ₹{order && order.amount}</span>
                  <button className="flex md:ml-auto md:mt-0 mt-5 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                </div>
              </div>
              <img alt="ecommerce" className="border h-full lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/orderimg.jpg" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  try {
    let order = await Order.findById({ _id: context.query.id })
    return {
      props: { order: JSON.parse(JSON.stringify(order)) },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

export default Orderparticular;