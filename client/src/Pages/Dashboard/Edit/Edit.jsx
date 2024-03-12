import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { data } from 'autoprefixer';

const Edit = () => {
    const {id} = useParams();
    const axios = useAxiosPublic()
    const allSizes = [
        "UK 6",
        "UK 6.5",
        "UK 7",
        "UK 7.5",
        "UK 8",
        "UK 8.5",
        "UK 9",
        "UK 9.5",
        "Uk 10",
        "Uk 10.5",
        "UK 11",
        "Uk 11.5",
      ];

      const { data: product = [], isPending } = useQuery({
        queryKey: ["Edit-product", id],
        queryFn: () => axios.get(`/products/${id}`).then((res) => res.data),
      });
      console.log(product);

    return (
        <div>
        <div className="flex gap-2 mt-3">
          <div className="w-full">
            <label className="font-semibold">Product Name</label>
            <input type="text" name="name" className="px-2 py-1 border-2 border-black w-full" />
          </div>
          <div className="w-full">
          <label className="font-semibold">Price</label>
            <input type="number" className="px-2 py-1 border-2 border-black w-full" />
          </div>
          <div className="w-full">
          <label className="font-semibold">Category</label>
            <select name="category" id="" className="px-2 py-1.5 border-2 border-black w-full" >
                <option value="Men's Shoes">Men's Shoes</option>
                <option value="Women's Shoes">Women's Shoes</option>
                <option value="Running Shoes">Running Shoes</option>
                <option value="Football Cleats">Football Cleats</option>
            </select>
          </div>
        </div>
          <div className="flex gap-4 mt-3">
            <div className="w-full">
              <h1 className="font-semibold">Select Sizes</h1>
              {
                allSizes.map((size,index)=><button key={index}  className={'border-2 border-black rounded px-3 py-1.5 text-lg font-semibold mx-2 mb-2'} >{size}</button>)
              }
            </div>
            <div className="w-full">
              <h1 className="font-semibold text-lg">Select Images</h1>
            <div className="flex gap-3">
            <form className="flex items-center gap-2">
          <input className="file:text-white file:border-1 file:border-black file:outline-none file:py-2 file:px-5 rounded-xl file:bg-black  mb-3 mt-1 text-lg border-2 border-black w-full" type="file" multiple={true} onChange={(e)=>setImages(e.target.files)} />
          <input className="bg-black px-5 py-3 text-white cursor-pointer -mt-1 rounded-md" type="submit" value='upload' />
        </form>
            </div>
            <div className="flex gap-3">
            </div>
            </div>
          </div>
          <div className="w-full mt-2">
          <label className="font-semibold">Description</label>
              <textarea className="w-full px-2 py-2 border-2 border-black" cols="30" rows="10"></textarea>
          </div>
          <button className="bg-black w-full cursor-pointer py-3 rounded text-white font-medium text-lg my-3">Update Product</button>
  
     </div>
    );
};

export default Edit;