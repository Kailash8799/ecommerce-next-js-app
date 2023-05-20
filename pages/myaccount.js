import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = ({ setuserlog, userlog }) => {
  const Router = useRouter();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [cupassword, cusetpassword] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, csetpassword] = useState('')
  useEffect(() => {
    let token = localStorage.getItem("token")
    let useremail = localStorage.getItem("useremail");
    if (!token) {
      Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
    else {
      const fun = async () => {
        try {
          let data = { token }
          let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          let res = await response.json();
          if (res.sucess) {
            setname(res.name)
            setaddress(res.address)
            setphone(res.phone)
            setpincode(res.pincode)
            setemail(res.email)
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
        }
        catch (error) {
          console.log(error, "some error accured");
        }
      }
      fun();
    }
    if (token && useremail) {
      setuserlog({ value: token, email: useremail })
    }
  }, [])

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == 'name') {
      setname(value)
    }
    else if (name == 'address') {
      setaddress(value)
    } else if (name == 'phone') {
      setphone(value)
    } else if (name == 'pincode') {
      setpincode(value)
    }
    else if (name == 'currpassword') {
      cusetpassword(value)
    }
    else if (name == 'newpassword') {
      setpassword(value)
    }
    else if (name == 'cnewpassword') {
      csetpassword(value)
    }
  }

  const handleClick = async () => {
    let token = localStorage.getItem("token")
    const data = { token, name, address, phone, pincode };
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let res = await response.json();
    if (res.sucess) {
      toast.success('Your details updated', {
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

  const handleClickpass = async () => {
    if (password.length > 4) {
      const data = { email, cupassword, password, cpassword }
      let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let res = await response.json();
      if (res.success) {
        toast.success('Password will be updated', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        cusetpassword("")
        setpassword("")
        csetpassword("")
      }
      else {
        toast.error(res.error, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    else{
      toast.error("Enter a minimum 5 character" , {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className='min-h-screen'>
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
      <h1 className="text-center text-3xl mt-5">Update your Account</h1>
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
        <div className='mx-3 md:mx-10 mt-4 mb-3'>
          <h2 className='font-medium text-2xl mb-3'>1. Default Delivery Details</h2>
          <div className='mx-auto flex'>
            <div className='w-1/2 px-2 flex-col'>
              <label htmlFor="name" className='leading-7 text-lg text-gray-600'>Name</label>
              <input value={name} onChange={handleChange} type="text" id="name" name="name" placeholder='Enter your name' className=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className='w-1/2 px-2 flex-col'>
              <label htmlFor="email" className='leading-7 text-lg text-gray-600'>Email</label>
              <input readOnly value={email} onChange={handleChange} type="email" id="email" name="email" placeholder='Enter your email' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-full mt-5">
            <div className="relative">
              <label htmlFor="address" className="leading-7 text-lg text-gray-600">Address</label>
              <textarea value={address} onChange={handleChange} id="address" name="address" placeholder='Enter your Address' className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
          <div className='mx-auto flex mt-5'>
            <div className='w-1/2 px-2 flex-col'>
              <label htmlFor="phone" className='leading-7 text-lg text-gray-600'>Phone Number</label>
              <input value={phone} onChange={handleChange} type="phone" id="phone" name="phone" placeholder='Your 10 digit phone number' className=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className='w-1/2 px-2 flex-col'>
              <label htmlFor="pincode" className='leading-7 text-lg text-gray-600'>Pincode</label>
              <input maxLength={6} onChange={handleChange} value={pincode} type="pincode" id="pincode" name="pincode" placeholder='Enter your pincode' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className='mx-5 my-5 md:ml-12'>
          <button onClick={handleClick} className=" text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg flex items-center disabled:bg-pink-300" disabled={false}>Submit</button>
        </div>
        <div className='mx-3 md:mx-10 mt-14'>
          <h2 className='font-medium text-2xl mb-3'>2. Update password</h2>
          <div className='mx-auto md:flex'>
            <div className='md:w-1/3 w-full px-2 flex-col'>
              <label htmlFor="oldpassword" className='leading-7 text-lg text-gray-600'>Current Password</label>
              <input value={cupassword} onChange={handleChange} type="password" id="currpassword" name="currpassword" placeholder='Enter your password' className=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className='md:w-1/3 w-full px-2 flex-col'>
              <label htmlFor="newpassword" className='leading-7 text-lg text-gray-600'>New Password</label>
              <input value={password} onChange={handleChange} type="password" id="newpassword" name="newpassword" placeholder='Enter your New password' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className='md:w-1/3 w-full px-2 flex-col'>
              <label htmlFor="cnewpassword" className='leading-7 text-lg text-gray-600'>Conform New Password</label>
              <input value={cpassword} onChange={handleChange} type="password" id="cnewpassword" name="cnewpassword" placeholder='Enter your conform newpassword' className=" bg-white w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className='mx-5 my-5 md:ml-12'>
          <button onClick={handleClickpass} className=" text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg flex items-center disabled:bg-pink-300" disabled={false}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Myaccount