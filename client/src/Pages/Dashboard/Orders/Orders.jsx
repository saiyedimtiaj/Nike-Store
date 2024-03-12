import { Card, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";

const TABLE_HEAD = [
  "SL",
  "Order Id",
  "Product Ids",
  "Total Price",
  "Order Time",
];

const Orders = () => {
  const axios = useAxiosPublic();
  const { data: orders = [] } = useQuery({
    queryKey: ["dashboard all-product"],
    queryFn: () =>
      axios.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div>
       <h1 className="font-bold text-4xl mt-7">All Orders</h1>

<nav class="flex" aria-label="Breadcrumb" className="mt-1">
  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li class="inline-flex items-center">
      <Link
      to='/dashboard'
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
      >
        <MdDashboard/>
        Dashboard
      </Link>
    </li>
    <li>
      <div class="flex items-center">
       <FaAngleRight/>
        <a
          class="ms-1 text-sm font-medium text-gray-500 hover:text-gray-800 md:ms-2 dark:text-gray-400 dark:hover:text-white"
        >
          Orders
        </a>
      </div>
    </li>
  </ol>
</nav>
   
    <div className="w-full text-sm">
      <div className="overflow-x-auto">
        <table className="shadow-md border mx-auto border-gray-100 my-6 w-full">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-3 text-left border-b">Order Id</th>
              <th className="py-3 px-3 text-left border-b">User</th>
              <th className="py-3 px-3 text-left border-b">Product Ids</th>
              <th className="py-3 px-3  border-b text-left">Total Price</th>
              <th className="py-3 px-3  border-b text-center">Order Time</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((item,index) => {
            const classes = "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index + 1}>
                <td>#
                {item?._id.slice(-5)}
                </td>
                <td  className="py-4 px-3 border-b">
                    {item?.email}
                </td>
                <td  className="py-4 px-3 border-b">
                    {
                      item.productId.map(ids=><div key={ids}>
                          {ids}
                      </div>)
                    }
                </td>
                <td  className="py-4 font-semibold text-lg px-3 border-b">
                   ${item?.price}
                </td>
                <td  className="py-4 px-3 border-b">
                  {item?.date}
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Orders;
