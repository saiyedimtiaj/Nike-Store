import { Link } from "react-router-dom";
import ProductCard from "../../Components/AllProduct/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import PriceSlider from "../../Components/AllProduct/PriceSlider/PriceSlider";

const AllProducts = () => {
  const axios = useAxiosPublic()

  const { data:product=[] } = useQuery({
    queryKey: ['product-page'],
    queryFn: () =>
      axios.get(`/allproduct`)
      .then(res=>res.data)
  })

  const price = product.map(product=>product.price)
  const maxPrice = Math.max(...price)
  const minPrice = Math.min(...price)

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
          <button className="mt-4">Man's Shoes</button>
          <br />
          <button className="my-1">Man's Shoes</button>
          <br />
          <button className="my-1">Man's Shoes</button>
          <br />
          <button className="my-1">Man's Shoes</button>
          <br />
        </div>
        <div className="mt-5 border-2 col-span-1 border-gray-600 py-6 px-5">
        <h1 className="text-lg font-semibold border-b-2 border-black pb-1">
            Filter Price
          </h1>
          <PriceSlider maxPrice={maxPrice} minPrice={minPrice} />
        </div>
       </div>
        <div className="flex-1">
          <div className="border-2 flex justify-between mb-5 py-4 px-3 items-center border-gray-600">
            <p>Showing 1-10 of 40</p>
            <div className="border-2 border-black">
              <select defaultValue='Sort By' className="px-4 py-1">
                <option value="Sort By" defaultChecked disabled>Sort By</option>
                <option className="px-2 py-3" value="1">Audi</option>
                <option className="px-2 py-3" value="1">Audi</option>
                <option className="px-2 py-3" value="1">Audi</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {product?.map(product=><ProductCard product={product} key={product?._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
