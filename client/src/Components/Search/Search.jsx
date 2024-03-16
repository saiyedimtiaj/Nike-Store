/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import "./search.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

const Search = ({ setShowSearch }) => {
    const [searchQuery,setSearchQuery] = useState('')
    const axios = useAxiosPublic();
    const navegate = useNavigate()

    const { data:product=[] } = useQuery({
        queryKey: ['search-product',searchQuery],
        queryFn: () =>
          axios.get(`/search-product?search=${searchQuery}`)
          .then(res=>res.data)
      })

      const handleProductDetails = id => {
        navegate(`/product/${id}`)
        setShowSearch(false)
      }

  return (
    <div className="fixed w-full h-full z-50 top-0 left-0 bg-white text-black search-modal">
      <div className="w-full flex justify-center px-10 py-4 border-b border-black relative">
        <input
          className="text-2xl outline-none border-none text-center font-semibold text-[#212121] uppercase"
          type="text"
          onChange={(e)=>setSearchQuery(e.target.value)}
          placeholder="Search for Product"
          autoFocus
        />
        <button className="absolute text-2xl -translate-y-1/2 top-1/2 right-5 cursor-pointer" onClick={() => setShowSearch(false)}>
          <MdClose />
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-4 mt-5">
        {
            searchQuery.length > 0 && product?.map(product=>  <div onClick={()=>handleProductDetails(product?._id)} key={product?._id} className="flex items-center gap-3 py-2 border-b border-gray-700 px-3 cursor-pointer">
            <img className="w-12" src={product?.images[0].url} alt="" />
              <div>
                  <h5 className="text-xl font-semibold">{product?.name}</h5>
                  <p className="whitespace-nowrap max-w-[100px] md:max-w-[640px] md:overflow-hidden text-ellipsis pr-2 text-sm">{product?.description}</p>
              </div>
            </div>)
        }
      </div>
    </div>
  );
};

export default Search;
