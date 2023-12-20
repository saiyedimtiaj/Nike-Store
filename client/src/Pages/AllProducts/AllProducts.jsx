import { Link } from "react-router-dom";
import ProductCard from "../../Components/AllProduct/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useState } from "react";

const AllProducts = () => {
  const axios = useAxiosPublic();
  const [category, setCategory] = useState("");
  const [sortField,setSortField] = useState('');
  const [sortValue,setSortValue] = useState('');


  const { data: product = [] } = useQuery({
    queryKey: ["product-page", category,sortField,sortValue],
    queryFn: () =>
      axios.get(`/allproduct?category=${category}&sortBy=${sortValue}&sortField=${sortField}`)
      .then((res) => res.data),
  });

  const handleSelect = e => {
    const option = e.target.value
    const myArr = option.split(",")
    setSortField(myArr[0])
    setSortValue(myArr[1])
  }

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
        <div>
          <div className="border-2 col-span-1 border-gray-600 py-6 px-5">
            <h1 className="text-lg font-semibold border-b-2 border-black pb-1">
              PRODUCT CATEGORIES
            </h1>
            <ul>
              <li
                onClick={() => setCategory("")}
                className="cursor-pointer my-3"
              >
                All
              </li>
              <li
                onClick={() => setCategory("Men's Shoes")}
                className="cursor-pointer my-3"
              >
                Men's Shoes
              </li>
              <li
                onClick={() => setCategory("Women's Shoes")}
                className="cursor-pointer my-3"
              >
                Women's Shoes
              </li>
              <li
                onClick={() => setCategory("Running Shoes")}
                className="cursor-pointer my-3"
              >
                Running Shoes
              </li>
              <li
                onClick={() => setCategory("Football Cleats")}
                className="cursor-pointer my-3"
              >
                Football Cleats
              </li>
            </ul>
            <br />
          </div>
          <div className="mt-5 border-2 col-span-1 border-gray-600 py-6 px-5">
            <h1 className="text-lg font-semibold border-b-2 border-black pb-1">
              Filter Price
            </h1>
          </div>
        </div>
        <div className="flex-1">
          <div className="border-2 flex justify-between mb-5 py-4 px-3 items-center border-gray-600">
            <p>Showing 1-10 of 40</p>
            <div className="border-2 border-black">
              <select className="px-2 py-1" defaultValue='sortby' onChange={handleSelect}>
                <option disabled value="sortby">Sort By</option>
                <option value="name,asc">Name : A - Z</option>
                <option value="name,desc">Name : Z - A</option>
                <option value="price,asc">Price : Low to High</option>
                <option value="price,desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {product?.map((product) => (
              <ProductCard product={product} key={product?._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
