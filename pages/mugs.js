import React from 'react'
import Link from 'next/link'
import Product from '../models/Product';
import mongoose from "mongoose";

const Mugs = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 mx-auto body-font min-h-screen">
        <div className="container px-20 md:px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry all the Mugs are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item)=>{
              return <Link legacyBehavior key={products[item]._id} href={`/product/${products[item].slug}`}>
              <div className=" border lg:w-1/5 md:w-1/4 sm:w-1/3 md:mx-4 sm:mx-4 p-1 w-full cursor-pointer my-6 lg:mx-4 shadow-xl hover:shadow-2xl">
                <a className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="h-[34vh] m-auto md:h-[36vh] block" src={products[item].img} />
                </a>
                <div className="mt-4 text-start pl-2">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                   {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-4 h-4 focus:outline-none"></button>} 
                   {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-4 h-4 focus:outline-none"></button>} 
                   {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-4 h-4 focus:outline-none"></button>} 
                   {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-4 h-4 focus:outline-none"></button>} 
                   {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-4 h-4 focus:outline-none"></button>} 
                   {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-4 h-4 focus:outline-none"></button>}
                    </div>
                  <div className="mt-1">
                   {products[item].size.includes('S') && <span className='border border-gray-400 px-1 mx-1'>S</span>} 
                   {products[item].size.includes('M') && <span className='border border-gray-400 px-1 mx-1'>M</span>} 
                   {products[item].size.includes('L') && <span className='border border-gray-400 px-1 mx-1'>L</span>} 
                   {products[item].size.includes('XL') && <span className='border border-gray-400 px-1 mx-1'>XL</span>} 
                   {products[item].size.includes('XXL') && <span className='border border-gray-400 px-1 mx-1'>XXL</span>}
                    </div>
                </div>
              </div>
            </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category:'Mugs'})
  let mugs = {};
  for (let item of products) {
      if (item.title in mugs) {
          if(!mugs[item.title].color.includes(item.color) && item.availableQty > 0){
              mugs[item.title].color.push(item.color);
          }
          if(!mugs[item.title].size.includes(item.size) && item.availableQty > 0){
              mugs[item.title].size.push(item.size);
          }
      }
      else {
          mugs[item.title] = JSON.parse(JSON.stringify(item));
          if (item.availableQty > 0) {
              mugs[item.title].size = [item.size];
              mugs[item.title].color = [item.color]
          }
      }
  }
  return {
    props: {products:JSON.parse(JSON.stringify(mugs))},
  }
}

export default Mugs
