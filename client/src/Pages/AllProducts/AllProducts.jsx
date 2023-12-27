import { Link } from "react-router-dom";
import ProductCard from "../../Components/AllProduct/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useState } from "react";

const AllProducts = () => {
  const axios = useAxiosPublic();
  const [sortField,setSortField] = useState('');
  const [sortValue,setSortValue] = useState('');
  const [allproduct,setAllproduct] = useState([])


  const { data: product = [],refetch } = useQuery({
    queryKey: ["product-page",sortField,sortValue],
    queryFn: () =>
      axios.get(`/allproduct?sortBy=${sortValue}&sortField=${sortField}`)
      .then((res) =>{
        setAllproduct(res.data)
        return res.data
      }),
  });

  const handleSelect = e => {
    const option = e.target.value
    const myArr = option.split(",")
    setSortField(myArr[0])
    setSortValue(myArr[1])
  }

  const handleCategory = (category) => {
    const filterProduct = product.filter((product)=>product?.category===category)
    console.log(filterProduct);
    setAllproduct(filterProduct)
  }

  const manShoes = product.filter(prod=>prod.category === "Men's Shoes")
  const womanShoes = product.filter(prod=>prod.category === "Women's Shoes")
  const runningShoes = product.filter(prod=>prod.category === "Running Shoes")
  const footballShoes = product.filter(prod=>prod.category === "Football Cleats")

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
                onClick={() => setAllproduct(product)}
                className="cursor-pointer flex justify-between items-center my-3"
              >
                <span> All</span>
                <span>({product.length})</span>
              </li>
              <li
                onClick={() => handleCategory("Men's Shoes")}
                className="cursor-pointer my-3 flex justify-between items-center"
              >
                <span>Men's Shoes</span>
                <span>({manShoes.length})</span>
              </li>
              <li
                onClick={() => handleCategory("Women's Shoes")}
                className="cursor-pointer my-3 flex justify-between items-center"
              >
                Women's Shoes
                <span>({womanShoes.length})</span>
              </li>
              <li
                onClick={() => handleCategory("Running Shoes")}
                className="cursor-pointer my-3 flex justify-between items-center"
              >
                Running Shoes
                <span>({runningShoes.length})</span>
              </li>
              <li
                onClick={() => handleCategory("Football Cleats")}
                className="cursor-pointer my-3 flex justify-between items-center"
              >
                Football Cleats
                <span>({footballShoes.length})</span>
              </li>
            </ul>
            <br />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allproduct?.map((product) => (
              <ProductCard product={product} key={product?._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
