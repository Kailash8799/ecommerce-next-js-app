import React from "react";
import BaseCard from "../baseCard/BaseCard";

const ProductPerfomance = ({products}) => {
  return (
    <>
    <BaseCard title="Products">
    <div>
    <div className="container text-center">
      {!products && <p className='mt-7'>No any order placed</p>}
      </div>
      {products && Object.keys(products).length !== 0 && <div className="items">
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
                       Product Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Category
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Image
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Size/Colour
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(products).map((val,ind)=>{
                      return  <tr key={ind} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{ind+1}</td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        {products[val].title}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                        {products[val].category}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                      <img src={products[val].img} className="imageset" style={{ height: '100px'}} alt="Image" srcset=""></img>
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                      {products[val].size}/{products[val].color}
                      </td>
                      <td className="text-md font-normal text-black px-6 py-4 whitespace-nowrap">
                       ₹{products[val].price}
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
