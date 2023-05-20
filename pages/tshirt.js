import React, { useState } from 'react'
import Link from 'next/link'
import Product from '../models/Product';
import mongoose from "mongoose";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { yellow, green, red,pink, blue } from '@mui/material/colors';

function valuetext(value) {
  return `${value}`;
}
const Tshirt = ({ products }) => {
  const [value, setValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <section className="mx-auto text-gray-600 body-font">
        <h1 className='mt-5 text-3xl text-black ml-11'>Products</h1>
        <div className="container py-10 mx-auto lg:flex px-14 md:px-5">
          <div className='hidden ml-6 lg:w-1/4 pr-7 lg:block'>
            <h1 className='pb-4 text-2xl font-bold border-b'>Filters</h1>
            <div className='flex items-center justify-between mt-3'>
              <h1 className='ml-3 text-lg font-semibold'>Theme</h1>
              <button className='px-2 py-1 border rounded-lg'>Clear</button>
            </div>
            <div className='mt-3 ml-10'>
              <div className='flex items-center'>
                <Checkbox /><p>Coding </p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>Gym</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>Plain & Oversized</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>Hacking</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>Lifestyle</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>Music</p>
              </div>

            </div>
            <div className='mt-3'>
              <h1 className='ml-3 text-lg font-semibold'>Price</h1>
              <Box sx={{ width: '200px' }} className='ml-10'>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
            </div>
            <div className='flex items-center justify-between mt-3'>
              <h1 className='ml-3 text-lg font-semibold'>Color</h1>
            </div>
            <div className='mt-3 ml-10'>
              <div className='flex items-center'>
                <Checkbox color="default"/><p>White</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>Black</p>
              </div>
              <div className='flex items-center'>
                <Checkbox sx={{
                  color: blue[800],
                  '&.Mui-checked': {
                    color: blue[600],
                  },
                }} /><p>Blue</p>
              </div>
              <div className='flex items-center'>
                <Checkbox sx={{
                  color: red[800],
                  '&.Mui-checked': {
                    color: red[600],
                  },
                }} /><p>Red</p>
              </div>
              <div className='flex items-center'>
                <Checkbox sx={{
                  color: yellow[800],
                  '&.Mui-checked': {
                    color: yellow[600],
                  },
                }} /><p>Yello</p>
              </div>
            </div>
            <div className='flex items-center justify-between mt-3'>
              <h1 className='ml-3 text-lg font-semibold'>Size</h1>
            </div>
            <div className='mt-3 ml-10'>
              <div className='flex items-center'>
                <Checkbox value={"S"}/><p>S</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>M</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>L</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>XL</p>
              </div>
              <div className='flex items-center'>
                <Checkbox /><p>XXL</p>
              </div>

            </div>
          </div>
          <div className="flex flex-wrap justify-center -m-4 lg:ml-0 lg:border-l lg:w-3/4 lg:justify-start">
            {Object.keys(products).length === 0 && <p>Sorry all the T-Shirts are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
              return <Link legacyBehavior key={products[item]._id} href={`/product/${products[item].slug}`}>
                <div className="flex-wrap w-full p-1 my-6 border-t shadow-xl cursor-pointer tshirtcart lg:w-1/5 md:w-1/4 sm:w-1/3 md:mx-4 sm:mx-4 h-min hover:shadow-2xl">
                  <a className="relative block overflow-hidden rounded">
                    <img alt="ecommerce" className="h-[34vh] m-auto md:h-[36vh] block" src={products[item].img} />
                  </a>
                  <div className="pl-2 mt-4 text-start">
                    <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">{products[item].category}</h3>
                    <h2 className="text-lg font-medium text-gray-900 title-font">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].color.includes('red') && <button className="w-4 h-4 ml-1 bg-red-700 border-2 border-gray-300 rounded-full focus:outline-none"></button>}
                      {products[item].color.includes('black') && <button className="w-4 h-4 ml-1 bg-black border-2 border-gray-300 rounded-full focus:outline-none"></button>}
                      {products[item].color.includes('green') && <button className="w-4 h-4 ml-1 bg-green-500 border-2 border-gray-300 rounded-full focus:outline-none"></button>}
                      {products[item].color.includes('yellow') && <button className="w-4 h-4 ml-1 bg-yellow-700 border-2 border-gray-300 rounded-full focus:outline-none"></button>}
                      {products[item].color.includes('blue') && <button className="w-4 h-4 ml-1 bg-blue-700 border-2 border-gray-300 rounded-full focus:outline-none"></button>}
                      {products[item].color.includes('white') && <button className="w-4 h-4 ml-1 bg-white border-2 border-gray-300 rounded-full focus:outline-none"></button>}
                    </div>
                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className='px-1 mx-1 border border-gray-400'>S</span>}
                      {products[item].size.includes('M') && <span className='px-1 mx-1 border border-gray-400'>M</span>}
                      {products[item].size.includes('L') && <span className='px-1 mx-1 border border-gray-400'>L</span>}
                      {products[item].size.includes('XL') && <span className='px-1 mx-1 border border-gray-400'>XL</span>}
                      {products[item].size.includes('XXL') && <span className='px-1 mx-1 border border-gray-400'>XXL</span>}
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
  let products = await Product.find({ category: 'T-Shirts' })
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color);
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size);
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].size = [item.size];
        tshirts[item.title].color = [item.color]
      }
      else {
        tshirts[item.title].size = [];
        tshirts[item.title].color = []
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  }
}

export default Tshirt
