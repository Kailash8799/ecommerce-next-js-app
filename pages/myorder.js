import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ImArrowRight } from 'react-icons/im';

const Myorder = () => {
  const [orders, setOrders] = useState([])
  const Router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    }
    else{
    const fetchorder = async()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token:localStorage.getItem('token')})
      });
      const resorder = await response.json(); 
      setOrders(resorder.orders);
    }
    fetchorder();
  }
  },[])
  return (
    <div className='md:mx-20 mx-3 min-h-screen mt-10'>
      <div className="container text-center">
        <h1 className='text-xl font-semibold'>My Orders</h1>
        {Object.keys(orders).length === 0 && <p className='mt-7'>You have not yet placed any order with CodesWear!</p>}
        </div>
        {Object.keys(orders).length !== 0 && <div className="items mt-10 md:mx-10">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b-2">
                      <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          #
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          OrderId
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Name
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Amount
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                         Payment Status
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(orders).map((val,ind)=>{
                        return  <tr key={ind} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{ind+1}</td>
                        <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                          {orders[val].orderId}
                        </td>
                        <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                          {orders[val].email}
                        </td>
                        <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        ₹{orders[val].amount}
                        </td>
                        <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        {orders[val].status}
                        </td>
                        <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                          <Link legacyBehavior href={'/order?id='+orders[val]._id}><a> <ImArrowRight/></a></Link>
                        </td>
                      </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
  )
}

export default Myorder