import React,{useEffect} from 'react'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Checkout = ({userlog,clearToCart, removeFromcart, addTocart, cart, subtotal }) => {
  const Router = useRouter();
  const [disable, setdisable] = useState(false)
  const [userinfo, setuserinfo] = useState({ name: '', email: userlog.email, phone: '', address: '', pincode: '' })
  const [services, setservices] = useState({ state: "", dis: "" })
  const [pincodevalid, setpincodevalid] = useState(false);
  const [checkval, setcheckval] = useState(false);

  useEffect(() => {
      let token = localStorage.getItem('token');
      if (token) {
        const fun = async () => {
        try{
          let data = { token }
          let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          let res = await response.json();
          if(res.sucess){
            setuserinfo({name: res.name, email: res.email, phone: res.phone, address: res.address, pincode: res.pincode })
            setdisable(false)
            if(res.pincode.length == 6){
                try {
                  let respo = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
                  let data = await respo.json();
                  if(Object.keys(data).includes(res.pincode)){
                    setservices({ state: data[res.pincode][1], dis: data[res.pincode][0]})
                    setpincodevalid(true)
                  }
                  else {
                    setservices({ state: "", dis: "" });
                    setpincodevalid(false)
                  }
                } catch (error) {
                    console.log("Server Error");
                    toast.error('Some error accured', {
                      position: "top-left",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                }
              }
              else{
                setservices({ state: "", dis: "" });
                setpincodevalid(false)
              }
            
            
        }
        else{
          toast.error('Some error accured', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }}
        catch(error){
          console.log(error , "some error accured");
        }
        }
        fun();
      }
     
    }, [])

  const handleChange = async(e) => {
    let name = e.target.name;
    let val = e.target.value;
    setuserinfo({ ...userinfo, [name]: val });
    setTimeout(() => {
      if (userinfo.name.length > 1 && userinfo.email.length > 1 && userinfo.address.length > 5 && userinfo.phone.length == 10 && pincodevalid) {
        setdisable(false)
      }
    }, 100);
  if(name == 'pincode'){
    if(e.target.value.length == 6){
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let data = await res.json();
      if(Object.keys(data).includes(e.target.value)){
        setservices({ state: data[e.target.value][1], dis: data[e.target.value][0]})
        setpincodevalid(true)
      }
      else {
        setservices({ state: "", dis: "" });
        setpincodevalid(false)
      }
    } catch (error) {
        console.log("Server Error");
        toast.error('Some error accured', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  }
  else{
    setservices({ state: "", dis: "" });
    setpincodevalid(false)
  }
}
}
  const inintiatePayment = async () => {

    let oid = Math.floor(Math.random() * Date.now())

    //Get a transaction token

    const data = { cart, subtotal, oid, email: userinfo.email, address: userinfo.address, name: userinfo.name, pincode: userinfo.pincode, phone: userinfo.phone ,dis:services.dis,state:services.state};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json();
    if(txnRes.sucess === 'error'){
      clearToCart();
      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
    let txnToken = txnRes.txnToken;

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subtotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    // initialze configuration using init method 
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });
    clearToCart();
  }
}
  const inintiatePaymentMethod = async () => {
    if (userinfo.name.length < 3 || userinfo.address.length < 10 || (!pincodevalid) || userinfo.phone.length !== 10 || Object.keys(cart).length ===0) {
     
      toast.error('Fill the correct details', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      if (!localStorage.getItem('token')) {
        Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
      } else {
        if (!checkval) {
          inintiatePayment();
        }
        else {
          let oid = Math.floor(Math.random() * Date.now())
          const data = { cart, subtotal, oid, email: userinfo.email, address: userinfo.address, name: userinfo.name, pincode: userinfo.pincode, phone: userinfo.phone ,dis:services.dis,state:services.state};
          try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cashorder`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            let res = await response.json();
            if (res.sucess === 'sucess') {
              toast.success('Your order has been placed successfully', {
                position: "top-left",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              clearToCart();
              setTimeout(() => {
                Router.push(`${process.env.NEXT_PUBLIC_HOST}/order?id=${res._id}`);
              }, 1000);
            }
            else if(res.sucess === 'error'){
              clearToCart()
              toast.error(res.error, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            else {
              toast.error('Some error accured', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } catch (error) {
            console.log({ error: "Some error accured" });
          }
        }
      }
    }
  }
  const checkboxcheck = (e) => {
    if (checkval) {
      setcheckval(false)
    } else {
      setcheckval(true);
    }
  }
  return (
    <div className='container mx-auto'>
      <ToastContainer
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
      <Head><meta name="viewport" content="width=device-width, height=device-height,
        initial-scale=1.0, maximum-scale=1.0"/></Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous"></Script>

      <h1 className='font-bold text-3xl my-4 text-center'>Checkout</h1>
      <div className='mx-3'>
        <h2 className='font-medium text-2xl '>1. Delivery Details</h2>
        <div className='mx-auto flex'>
          <div className='w-1/2 px-2 flex-col'>
            <label htmlFor="name" className='leading-7 text-lg text-gray-600'>Name</label>
            <input value={userinfo.name} onChange={handleChange} type="text" id="name" name="name" placeholder='Enter your name' className=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className='w-1/2 px-2 flex-col'>
            <label htmlFor="email" className='leading-7 text-lg text-gray-600'>Email</label>
          {userlog.value ?  <input readOnly value={userlog.email} onChange={handleChange} type="email" id="email" name="email" placeholder='Enter your email' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : 
           <input value={userinfo.email} onChange={handleChange} type="email" id="email" name="email" placeholder='Enter your email' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          }
          </div>
        </div>
        <div className="px-2 w-full mt-5">
          <div className="relative">
            <label htmlFor="address" className="leading-7 text-lg text-gray-600">Address</label>
            <textarea value={userinfo.address} onChange={handleChange} id="address" name="address" placeholder='Enter your Address' className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className='mx-auto flex mt-5'>
          <div className='w-1/2 px-2 flex-col'>
            <label htmlFor="phone" className='leading-7 text-lg text-gray-600'>Phone Number</label>
            <input value={userinfo.phone} onChange={handleChange} type="phone" id="phone" name="phone" placeholder='Your 10 digit phone number' className=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className='w-1/2 px-2 flex-col'>
            <label htmlFor="pincode" className='leading-7 text-lg text-gray-600'>Pincode</label>
            <input maxLength={6} onChange={handleChange} value={userinfo.pincode} type="pincode" id="pincode" name="pincode" placeholder='Enter your pincode' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='mx-auto flex mt-5'>
          <div className='w-1/2 px-2 flex-col'>
            <label htmlFor="state" className='leading-7 text-lg text-gray-600'>State</label>
            <input onChange={() => { }} readOnly value={services.state} type="state" id="state" name="state" placeholder='Enter your state' className=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className='w-1/2 px-2 flex-col'>
            <label htmlFor="district" className='leading-7 text-lg text-gray-600'>District</label>
            <input onChange={() => { }} readOnly value={services.dis} type="district" id="district" name="district" placeholder='Enter your district' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className='mx-3 my-5'>
        <h2 className='font-medium text-2xl '>2. Review Cart Items & Pay</h2>

        <div className="mt-3 sideCart border bg-pink-200 w-full">
          <div className='my-5'>
            <div className="cartitems ml-12">
              {Object.keys(cart).length !== 0 && <ol className='list-decimal font-medium'>
                {Object.keys(cart).map((k) => {
                  return <li key={k} className='py-2'>
                    <div className="item flex">
                      <div className="w-2/3 md:w-1/2 font-semibold text-lg">{`${cart[k].itemname}(${cart[k].size}/${cart[k].variant})`}</div>
                      <div className='w-1/3 md:w-1/2 items-center md:justify-start justify-center flex'>
                        <div onClick={() => { removeFromcart(k, 1, cart[k].price, cart[k].itemname, cart[k].size, cart[k].variant) }} className='px-2 cursor-pointer'><FaMinusCircle className='text-pink-500 text-xl' /></div>
                        <div>{cart[k].qty}</div>
                        <div onClick={() => { addTocart(k, 1, cart[k].price, cart[k].itemname, cart[k].size, cart[k].variant) }} className='px-2 cursor-pointer'><FaPlusCircle className='text-pink-500 text-xl' /></div>
                      </div>
                    </div>
                  </li>
                })}
              </ol>}
              {Object.keys(cart).length === 0 && 'Your cart is Empty!'}
            </div>
            <div className='ml-10 mt-7 text-xl font-bold'>
              Subtotal : ₹{subtotal}
            </div>    
          </div>
        </div>
      </div>
      <div className="mx-3 my-5">
        <div className="lg:flex lg:items-center">
          <div className="form-check flex lg:w-2/3 items-center mx-2">
            <input onClick={checkboxcheck} id="myCheck" type="checkbox" value={checkval} className="w-4 h-4 text-pink-600 bg-gray-100 rounded border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2" />
            <div className="form-check-label inline-block text-gray-800">
              I want to place a Cash on Delivery (COD) Order. I promise to pay the delivery partner on delivery
            </div>
          </div>
          <div className="lg:w-1/3">
            <h1 className='mt-4 mb-2 text-md'>Apply Promo code</h1>
            <input type="text" id="email" name="number" placeholder='Enter code(Only prepaid)' className="md:w-60 w-40  bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <button className="ml-4 md:ml-10 text-white bg-pink-500 border-0 py-2 md:px-6 px-3 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-400">Apply</button>
          </div>
        </div>
      </div>
      <div className='mx-5 my-5'>
        <button onClick={inintiatePaymentMethod} className=" text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg flex items-center disabled:bg-pink-300" disabled={disable}><BsFillBagCheckFill className='text-xl' /><span className='pl-2'> Pay₹{subtotal}</span></button>
      </div>
    </div>
  )
}

export default Checkout