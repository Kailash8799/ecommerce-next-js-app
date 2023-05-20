import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forget = () => {
  let Router = useRouter();
  const [email, setemail] = useState("")
  const [npassword, setnpassword] = useState("")
  const [cnpassword, setcnpassword] = useState("")
  const [qtoken, setqtoken] = useState(undefined);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
    setqtoken(Router.query.token)
  }, [Router.query])

  const onChangefun = (e) => {
    setemail(e.target.value);
  }
  const onChangepass = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    if (name == 'npassword') {
      setnpassword(val)
    }
    else if (name == 'cnpassword') {
      setcnpassword(val)
    }
  }
  const OnSubmit = async (e) => {
    e.preventDefault();
    let data = { email, sendMail: true}
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resorder = await response.json();
    if (resorder.success) {
      setemail("")
      toast.success('We send the forgot password link in your email', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error(resorder.error, {
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
  const OnSubmitUpdate = async(e) => {
    e.preventDefault();
    if (npassword == cnpassword && npassword.length > 4) {
      let data = { npassword, sendMail: false, qtoken}
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const resorder = await response.json();
      if (resorder.success) {
        setnpassword("")
        setcnpassword("")
        toast.success('Password will be updated', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error(resorder.error, {
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
    else {
      toast.error('Password will not matched with confirm password or password length should be more than 5 character', {
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
    <div className="flex md:mb-56 mb-36 md:mt-14 mt-14 min-h-[10vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/login"} legacyBehavior><a className="font-medium text-pink-600 hover:text-pink-500"> Login</a></Link>
          </p>
        </div>
        {qtoken == undefined && <form onSubmit={(e) => { e.preventDefault() }} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input onChange={onChangefun} value={email} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Email address" />
            </div>
          </div>

          <div>
            <button onClick={OnSubmit} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>Continue
            </button>
          </div>
        </form>}
        {qtoken != undefined && <form onSubmit={(e) => { e.preventDefault() }} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="npassword" className="sr-only">New Password</label>
              <input onChange={onChangepass} value={npassword} id="npassword" name="npassword" type="password" autoComplete="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="New Password" />
            </div>
            <div>
              <label htmlFor="cnpassword" className="sr-only">Confirm New Password</label>
              <input onChange={onChangepass} value={cnpassword} id="cnpassword" name="cnpassword" type="password" autoComplete="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Confirm New Password" />
            </div>
          </div>

          <div>
            <button onClick={OnSubmitUpdate} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>Continue
            </button>
          </div>
        </form>}
        {cnpassword == npassword && npassword.length > 0 && <span className='text-green-500 mt-3'>Password match</span>}
        {cnpassword != npassword && <span className='text-red-500'>Password dont match</span>}
      </div>
    </div>
  )
}

export default Forget;