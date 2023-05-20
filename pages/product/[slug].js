import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link';
import Product from '../../models/Product';
import mongoose from "mongoose";
import Error from 'next/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};


const Post = ({ error, buyNow, addTocart, product, variant }) => {
  const router = useRouter();
  const [color, setcolor] = useState()
  const [size, setsize] = useState()
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!error) {
      setcolor(product.color)
      setsize(product.size)
    }
  }, [router.query])
  const { slug } = router.query
  const [pincode, setpincode] = useState('')
  const [services, setservices] = useState(null)
  const addPincode = (e) => {
    setpincode(e.target.value)
  }
  const checkservices = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let data = await res.json();
      if (Object.keys(data).includes(pincode)) {
        setservices(true)
        setpincode('')
        toast.success('Yay! This pincode is serviceable!', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        setservices(false)
        setpincode('')
        toast.error('Sorry this pincode not serviceable!', {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Sorry some error accured!', {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


  const refreshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variant[newColor][newSize]['slug']}`;
    // window.location = url
    router.push(url);
  }

  if (error == 404) {
    return <Error statusCode={error} />
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <> <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      <section className="overflow-hidden text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <div className='w-full lg:w-1/2'>
              <img alt="ecommerce" className="h-auto px-24 py-10 mx-auto rounded lg:h-auto" src={product.img} />
            </div>
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">CODESWEAR</h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">{product.title} {`(${size} / ${color})`}</h1>

              <p className="mt-3 leading-relaxed">{product.desc}</p>
              <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variant).includes('red') && Object.keys(variant['red']).includes(size) && <button onClick={() => { refreshVariant(size, 'red') }} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}

                  {Object.keys(variant).includes('black') && Object.keys(variant['black']).includes(size) && <button onClick={() => { refreshVariant(size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-gray-300'}`}></button>}

                  {Object.keys(variant).includes('green') && Object.keys(variant['green']).includes(size) && <button onClick={() => { refreshVariant(size, 'green') }} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}

                  {Object.keys(variant).includes('yellow') && Object.keys(variant['yellow']).includes(size) && <button onClick={() => { refreshVariant(size, 'yellow') }} className={`border-2 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}

                  {Object.keys(variant).includes('blue') && Object.keys(variant['blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'blue') }} className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}

                  {Object.keys(variant).includes('white') && Object.keys(variant['white']).includes(size) && <button onClick={() => { refreshVariant(size, 'white') }} className={`border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                </div>
                <div className="flex items-center ml-6">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500">
                      {color && Object.keys(variant[color]).includes('S') && <option value={'S'}>S</option>}
                      {color && Object.keys(variant[color]).includes('M') && <option value={'M'}>M</option>}
                      {color && Object.keys(variant[color]).includes('L') && <option value={'L'}>L</option>}
                      {color && Object.keys(variant[color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {color && Object.keys(variant[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                    </select>
                    <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty != 0 ? <span className="text-2xl font-medium text-gray-900 title-font">₹{product.price}</span> :
                  <span className="text-lg font-medium text-gray-900 title-font md:text-2xl">Out of Stock!</span>
                }
                <Link href={"/checkout"}><button disabled={product.availableQty == 0} onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex px-3 py-2 ml-4 text-white bg-pink-500 border-0 rounded  disabled:bg-pink-300 md:ml-10 focus:outline-none hover:bg-pink-600">Buy Now</button></Link>
                <button disabled={product.availableQty == 0} onClick={() => {
                  addTocart(slug, 1, product.price, product.title, size, color);
                  toast.success('Item has been added in cart', {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }} className="flex px-3 py-2 ml-4 text-white bg-pink-500 border-0 rounded disabled:bg-pink-300 md:ml-4 focus:outline-none hover:bg-pink-600">Add to Cart</button>
              </div>
              <div className='mt-5'>
                <p>Note: Our tshirts are custom tailored to be tight fit. If you prefer loose fitting, please order a size larger
                </p>
              </div>
              <div className='flex items-center mt-5 text-lg font-medium'>
                <h6>Size Chart</h6>
                <div>
                  <Button onClick={handleOpen}>
                <span className='cursor-pointer'><img src="/size.svg" alt="Size" className='w-20 h-10' /></span></Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} className="md:w-1/2">
                      <img src="/sizec.webp" alt="sizechart"/>
                    </Box>
                  </Modal>
                </div>
              </div>
              <div className="relative mt-4">
                <input onChange={addPincode} value={pincode} type="text" id="email" name="number" placeholder='Enter your pincode' className="w-40 px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none md:w-60 focus:border-pink-500 focus:ring-2 focus:ring-indigo-200" />
                <button className="px-3 py-2 ml-2 text-white bg-pink-500 border-0 rounded md:ml-10 md:px-6 focus:outline-none hover:bg-pink-600 disabled:bg-pink-400" onClick={checkservices} disabled={!pincode}>Check</button>
              </div>
              {services && services !== null && <div className='text-green-700 '>
                <p className="mt-2 text-sm">Yay! This pincode is serviceable</p>
              </div>}
              {!services && services !== null && <div className='text-red-700 '>
                <p className="mt-2 text-sm">Sorry! We do not deliver to this pincode yet</p>
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if (product == null) {
    return {
      props: { error: 404 },
    }
  }
  let variants = await Product.find({ title: product.title, category: product.category });
  let colorsizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorsizeSlug).includes(item.color)) {
      colorsizeSlug[item.color][item.size] = { slug: item.slug };
    }
    else {
      colorsizeSlug[item.color] = {}
      colorsizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }
  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variant: JSON.parse(JSON.stringify(colorsizeSlug)) },
  }
}

export default Post;