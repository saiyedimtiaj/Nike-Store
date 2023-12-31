import { Link } from "react-router-dom";
import ProductCard from "../../Components/AllProduct/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const axios = useAxiosPublic();
  const [sortField, setSortField] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [category,setCategory] = useState('all')

  const { data: products = [], refetch } = useQuery({
    queryKey: ["product-page", sortField, sortValue, currentPage,category],
    queryFn: () =>
      axios
        .get(
          `/allproduct?sortBy=${sortValue}&sortField=${sortField}&currentPage=${currentPage}&category=${category}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    axios.get("productcount").then((res) => setPageCount(res.data.count));
  }, []);

  const pageSize = Math.ceil(pageCount / 6);
  const pages = [];
  for (let i = 1; i < pageSize; i++) {
    pages.push(i);
  }

  const handleSelect = (e) => {
    const option = e.target.value;
    const myArr = option.split(",");
    setSortField(myArr[0]);
    setSortValue(myArr[1]);
  };

  const handleCategory = (cate) => {
    setCategory(cate)
    setCurrentPage(0)
  };

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


  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-3 mt-3 mb-5 items-center">
        <Link to="/">
          <span className="cursor-pointer">Home</span>
        </Link>
        <span className="text-xl"> > </span>
        <span className="text-red-700">Shop</span>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="border-2 col-span-1 border-gray-600 py-6 px-5">
          <h1 className="text-lg font-semibold border-b-2 border-black pb-1">
            PRODUCT CATEGORIES
          </h1>
          <ul>
            <li
              className="cursor-pointer flex justify-between items-center my-3"
              onClick={()=>handleCategory('all')}
            >
              <span> All</span>
            </li>
            <li
              className="cursor-pointer my-3 flex justify-between items-center"
              onClick={()=>handleCategory("Men's Shoes")}
            >
              <span>Men's Shoes</span>
            </li>
            <li
              className="cursor-pointer my-3 flex justify-between items-center"
              onClick={()=>handleCategory("Women's Shoes")}
            >
              Women's Shoes
            </li>
            <li
              className="cursor-pointer my-3 flex justify-between items-center"
              onClick={()=>handleCategory('Running Shoes')}
            >
              Running Shoes
            </li>
            <li
              className="cursor-pointer my-3 flex justify-between items-center"
              onClick={()=>handleCategory('Football Cleats')}
            >
              Football Cleats
            </li>
          </ul>
          <br />
        </div>
        <div className="flex-1">
          <div className="border-2 flex justify-between mb-5 py-4 px-3 items-center border-gray-600">
            <p>Showing {currentPage === 0 ? 1 : currentPage * 6}-{(currentPage + 1)*6} of {pageCount}</p>
            <div className="border-2 border-black">
              <select
                className="px-2 py-1"
                defaultValue="sortby"
                onChange={handleSelect}
              >
                <option disabled value="sortby">
                  Sort By
                </option>
                <option value="name,asc">Name : A - Z</option>
                <option value="name,desc">Name : Z - A</option>
                <option value="price,asc">Price : Low to High</option>
                <option value="price,desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products?.map((product) => (
              <ProductCard product={product} key={product?._id} />
            ))}
          </div>
          <div className="flex gap-4 items-center justify-end mt-6">
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
              Page <strong>{currentPage + 1}</strong> of <strong>{pageSize}</strong>
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
      </div>
    </div>
  );
};

export default AllProducts;
