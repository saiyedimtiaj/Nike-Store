import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useEffect } from "react";
import { useState } from "react";
import { FaAngleRight, FaEdit, FaHome } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import UpdateModal from "../../../Components/UpdateModal/UpdateModal";

const All_Product = () => {
  const [pageCount, setPageCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectSizes, setSelectSizes] = useState([]);
  const [item,setItem] = useState([])
  const axios = useAxiosPublic();
  const { data: products = [], refetch,isLoading } = useQuery({
    queryKey: ["dashboard all-product", currentPage],
    queryFn: () =>
      axios
        .get(`/dashboard-allProduct?currentPage=${currentPage}`)
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    axios.get("productcount").then((res) => setPageCount(res.data.count));
  }, [axios]);

  const pageSize = Math.ceil(pageCount / 10);
  const pages = [];
  for (let i = 1; i < pageSize; i++) {
    pages.push(i);
  }

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handelProduce = (item) => {
    setItem(item)
    setSelectSizes(item?.sizes)
    setOpenModal(true)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "#FFF",
      background: "#000",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              background: "#000",
              showCancelButton: true,
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if(isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className="font-bold text-4xl mt-7">All Product</h1>

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
                All Product
              </a>
            </div>
          </li>
        </ol>
      </nav>
      
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="shadow-md border mx-auto border-gray-100 my-6 w-full">
            <thead>
              <tr className="bg-[#333333] text-white">
                <th className="py-3 px-4 text-left border-b">ID</th>
                <th className="py-3 px-4 text-left border-b">Image</th>
                <th className="py-3 px-4 text-left border-b">Name</th>
                <th className="py-3 px-4 text-left border-b">Category</th>
                <th className="py-3 px-4 text-left border-b">Price</th>
                <th className="py-3 px-4  border-b text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr
                  key={product?._id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-4 px-4 border-b">
                    #{product?._id.slice(-5)}
                  </td>
                  <td className="py-4 px-4 flex justify-start">
                    <img
                      src={product?.images[0]?.url}
                      alt={product?.name}
                      className="h-16 w-16 object-cover bg-gray-300"
                    />
                  </td>
                  <td className="py-4 px-4 border-b">{product?.name}</td>
                  <td className="py-4 px-4 border-b">{product?.category}</td>
                  <td className="py-4 px-4 border-b font-semibold">
                    ${product?.price}
                  </td>
                  <td className="py-4 px-4 border-b">
                    <button onClick={()=>handelProduce(product)} className="text-white bg-green-600 mr-2 p-1 rounded">
                      <FaEdit size={23} />
                    </button>
                    <button
                      onClick={() => handleDelete(product?._id)}
                      className="text-white bg-red-600 p-1 rounded"
                    >
                      <AiFillDelete size={23} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 items-center justify-end mt-1 mb-6">
          <button
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
              </svg>
            </span>
          </button>
          <p>
            Page <strong>{currentPage + 1}</strong> of{" "}
            <strong>{pageSize}</strong>
          </p>
          <button
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleNext}
            disabled={products.length < 6}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <UpdateModal refetch={refetch} selectSizes={selectSizes} setSelectSizes={setSelectSizes} item={item} openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default All_Product;
