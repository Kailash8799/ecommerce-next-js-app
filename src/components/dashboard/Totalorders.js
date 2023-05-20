import React from "react";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";

const ProductPerfomance = ({orders}) => {
  return (
    <>
    <BaseCard title="Orders">
      {/* <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "wrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                #
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Address
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.map((order,key) => (
            <TableRow key={key}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {key+1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {order.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {order.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {(order.address).slice(0,30)}...
                </Typography>
              </TableCell>
             
              <TableCell align="right">
                <Typography variant="h6" className="text-md">₹{order.amount}</Typography>
              </TableCell>
            </TableRow>
          ))}
        
        </TableBody>
      </Table> */}
   
    <div>
    <div className="container text-center">
      {!orders && <p className='mt-7'>No any order placed</p>}
      </div>
      {orders && Object.keys(orders).length !== 0 && <div className="items">
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
                        Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Address
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                       Payment Status
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(orders).map((val,ind)=>{
                      return  <tr key={ind} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{ind+1}</td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        {orders[val].name}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        {orders[val].email}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                      {(orders[val].address).slice(0,30)}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                      {orders[val].status}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        <Link href={'/order?id='+orders[val]._id}><a>₹{orders[val].amount}</a></Link>
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
    </BaseCard>
    </>
  );
};

export default ProductPerfomance;
